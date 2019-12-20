

import {
    // get_id
} from '../../socket/socket_global'

const jsonWebToken = require('jsonwebtoken')

import {
    getRandonUserName,
    getUserCode,
    saveUserInfomation,
    getjwtToken,
    verifyJwtToken,
    checkUserName,
    getUserInfo
} from '../../util'

import {
    redisIncr, redisGet
} from '../../util/redis_operation.js'

import redisKey from '../../util/redis_key.js'

import moment from 'moment';
import UserInfoModel from '../../orm/mongodb/user_info_model'
import MessageInfoModel from '../../orm/mongodb/message_info_model'
import SocketInfoModel from '../../orm/mongodb/socket_info_model'


function getMessageRecord(user_code) {
    return new Promise(async (resolve, reject) => {
        MessageInfoModel.find({
            $or: [{
                user_code,
            }, {
                to_user_code: user_code
            }]
        }).then(res => {


            const record_obj = {};

            res.forEach((item, index) => {
                // const target_user_code = function(data){
                //     let user;
                //     if(data.user_code === user_code){
                //         user = to_user_code
                //     }else{
                //         user = user_code;
                //     }
                //     return user
                // }(item)
                const target_user_code = (parseInt(user_code) === parseInt(item.user_code)) ? item.to_user_code : item.user_code;
                // console.log('==========', target_user_code, parseInt(user_code) === parseInt(item.user_code))
                if (record_obj[target_user_code]) {
                    const frist_item = record_obj[target_user_code][0];
                    if (moment(frist_item.create_time).isAfter(moment(item.create_time))) {
                        record_obj[target_user_code].unshift(item)
                    } else {
                        record_obj[target_user_code].push(item)
                    }
                } else {
                    record_obj[target_user_code] = [item];
                }
            })
            // console.log('getMessageRecord', record_obj[user_code]);
            resolve(record_obj)

        })

    })
}




// import mongodb from '../../config/mongodb.js'


// export function saveSocketInfo(user_code, socket_id) {//保存socket_id并且增加在线人数
//     if (user_code && socket_id) {
//         SocketInfoModel.findOne({
//             user_code,
//         }).then(res => {
//             console.log(res, '#########')
//             if (!!res) {
//                 SocketInfoModel.updated({
//                     user_code,
//                 }, {
//                     socket_id: socket_id
//                 }).then()
//             } else {
//                 SocketInfoModel.create({
//                     user_code, socket_id
//                 }).then()
//             }
//         })
//     } else {
//         throw new Error('参数错误')
//     }
// }

function userOffLine(user_code) {//用户下线，删除socket_id,

}

function getSocketId(user) {

}

export function setUserOnlineNum() {
    return new Promise(async (resolve, reject) => {
        const redis_key = redisKey.online_num();

        redisIncr(redis_key);
        resolve('succcess')

    })
}

export function reduceUserOnlineNum() {
    return new Promise(async (resolve, reject) => {
        const redis_key = redisKey.online_num();
        redisIncr(redis_key, -1);
        resolve('succcess')

    })
}

export async function keep_user_online(ctx, next) {
    try {

        const req_data = ctx.request.body,
            user_code = req_data.user_code,
            socket_id = req_data.socket_id;

        const req_header = ctx.header,
            jwt_token = req_data.token;

        console.log(req_data, 'jwt_token')

        let new_token, new_user_name, new_user_code, user_frist_login, user_status;

        if (jwt_token) {//表示用户不是第一次登录
            user_frist_login = 1; new_token = jwt_token;
            let verifyData
            try {
                verifyData = verifyJwtToken(jwt_token)
                console.log(verifyData, 'verifyData')
                new_user_code = verifyData.user_code;
                // user_status = verifyData.user_status;
                // new_user_name = verifyData.user_name;
                let user_info = await getUserInfo(new_user_code);
                // console.log(user_info,'uuuuuuuu')
                user_status = user_info[new_user_code].user_status;
                new_user_name = user_info[new_user_code].user_name;
            } catch (e) {
                console.log(e)
                throw new Error('token非法')
            }


        } else {//表示用户第一次登录
            //需要生成一个用户信息并保存

            //用户的信息主要包括一个user_code,socket_id,用户名

            new_user_name = await getRandonUserName();
            new_user_code = await getUserCode();

            // console.log(new_user_code, 'new_user_code')

            //保存用户信息并且生成一个jwttoken;
            user_frist_login = 0;
            user_status = 0;
            saveUserInfomation({
                user_code: new_user_code,
                user_name: new_user_name,
                user_status: 0//用户类型 0表示未注册,1表示已注册
            })
            new_token = getjwtToken(new_user_code, 0)



        }

        //获取消息通知
        let message_record = await getMessageRecord(new_user_code);
        // console.log(message_record[new_user_code], 'rrrrrrrrrrr')

        //保存socket_id
        // saveSocketInfo(user_code, socket_id)


        ctx.body = {
            code: 200,
            token: new_token,
            user_code: new_user_code,
            user_status: user_status,
            user_name: new_user_name,
            message_data: message_record,
            msg: 'success'
        }


        //后续操作

        //增加在线人数
        // setUserOnlineNum().then();

    } catch (e) {
        console.log(e)
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }

}

export async function register(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            user_name = reqData.user_name,
            password = reqData.password;

        //判断用户名是否重复

        let result = await checkUserName(user_name, user_code);
        if (result) {//表示用户名可用

            let new_user_info = await UserInfoModel.findByIdAndUpdate({
                user_code: user_code
            }, {
                $set: {
                    user_name: user_name,
                    user_status: 1,
                    register_time: moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')
                }
            })

            let new_token = getjwtToken(user_code, 1);

            ctx.body = {
                code: 200,
                data: {
                    new_token: new_token,
                    user_info: new_user_info
                }
            }

        } else {//用户名非法无法使用
            ctx.body = {
                code: 500,
                msg: 'repeat_user_name'
            }
        }


    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

export function getOnlineUserNum() {
    return new Promise(async (resolve, reject) => {
        const redis_key = redisKey.online_num();
        let total_num = parseInt(await redisGet(redis_key));
        resolve(total_num)
    })
}

export async function getUserOnlineTotalNum(ctx, next) {
    try {
        const num = await getOnlineUserNum();
        ctx.body = {
            code: 200,
            num,
        }
    } catch (error) {
        console.log(error)
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}
