

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

import moment from 'moment';
import UserInfoModel from '../../orm/mongodb/user_info_model'




// import mongodb from '../../config/mongodb.js'

export async function keep_user_online(ctx, next) {
    try {

        const req_data = ctx.request.body,
            user_code = req_data.user_code,
            socket_id = req_data.socket_id;

        const req_header = ctx.header,
            jwt_token = req_data.token;

        // console.log(jwt_token, 'jwt_token')

        let new_token, new_user_name, new_user_code, user_frist_login

        if (jwt_token) {//表示用户不是第一次登录
            user_frist_login = 1;
            let verifyData
            try {
                verifyData = verifyJwtToken(jwt_token)
                // console.log(verifyData, 'verifyData')
                new_user_code = verifyData.user_code;
                // new_user_name = verifyData.user_name;
                let user_info = await getUserInfo(new_user_code);
                // console.log(user_info,'uuuuuuuu')
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

            console.log(new_user_code,'new_user_code')

            //保存用户信息并且生成一个jwttoken;
            user_frist_login = 0;
            saveUserInfomation({
                user_code: new_user_code,
                user_name: new_user_name,
                user_status: 0//用户类型 0表示未注册,1表示已注册
            })
            new_token = getjwtToken(new_user_code,0)



        }



        ctx.body = {
            code: 200,
            token: new_token,
            user_code: new_user_code,
            user_status: user_frist_login,
            user_name:new_user_name,
            msg: 'success'
        }


        //后续操作
    } catch (e) {
        console.log(e)
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }

}

export async function register(ctx,next){
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            user_name = reqData.user_name,
            password = reqData.password;
        
        //判断用户名是否重复

        let result = await checkUserName(user_name);
        if(result){//表示用户名可用

            let new_user_info = await UserInfoModel.findByIdAndUpdate({
                user_code:user_code
            },{$set:{
                user_name:user_name,
                user_status:1,
                register_time:moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')
            }})

            let new_token = getjwtToken(user_code,1);

            ctx.body = {
                code:200,
                data:{
                    new_token:new_token,
                    user_info:new_user_info
                }
            }

        }else{//用户名非法无法使用
            ctx.body = {
                code:500,
                msg:'repeat_user_name'
            }
        }

        
    } catch (error) {
        console.log(error);
        ctx.body = {
            code:500,
            msg:'error'
        }
    }
}
