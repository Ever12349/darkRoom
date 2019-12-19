const uuidv1 = require('uuid/v1')


import {
    redisHashSet,
    redisHashGet
} from '../../util/redis_operation';
import {
    setRecordByUserCode,
    getMessageRecordByUserCode,
    getFriendsListByUserCode,
    setNewFriend,
} from './uitl.js'

import {
    getUserInfo
} from '../../util/index.js'


import { sendMessageBySocket } from '../../socket/socket_global'
import moment from 'moment'

import FriendsInfoModel from '../../orm/mongodb/friends_info_model.js'

export async function friendsApplication(ctx) {//好友申请
    try {
        const reqData = ctx.request.body,
            // action = reqData.action,//用户行为
            user_code = parseInt(reqData.user_code),//user_code表示发送申请的用户
            to_user_code = parseInt(reqData.to_user_code),//to_user_code表示接收申请的用户
            message = reqData.message;
        console.log(reqData)

        let preback, scoket_result = true;

        //判断是否已经申请

        const friends_apply_info = await FriendsInfoModel.findOne({
            $or: [{
                user_code: user_code,
                to_user_code: to_user_code
            }, {
                user_code: to_user_code,
                to_user_code: user_code,
            }]
        })

        console.log(friends_apply_info, 'friends_apply_info')
        if (friends_apply_info) {

            if (friends_apply_info.user_code === user_code) {//已经申请过了
                preback = {
                    code: 500,
                    msg: 'has_apply'
                }
            } else {//对方已经申请，只需添加好友

                // let model_obj = {
                //     order_id: uuidv1(),
                //     user_code: to_user_code,
                //     to_user_code: user_code,
                //     create_time: moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')
                // }

                // await FriendsInfoModel.create(model_obj)
                preback = {
                    code: 200,
                    msg: 'has_being_friends'
                }
                let record = ``
                scoket_result = await sendMessageBySocket(to_user_code, record)


            }

        } else {
            let record = await setRecordByUserCode(user_code, to_user_code, message, 2)
            console.log(record, 'sssssssssssss<<<<<<<<<<<<>>>>>>>>>>>>>>>>>')

            preback = {
                code: 200,
                msg: 'success'

            }

            //后续socket操作

            scoket_result = await sendMessageBySocket(to_user_code, record)


        }




        ctx.body = {
            ...preback
        }

        if (!scoket_result) {//表示用户不在线无法发送

        }


    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            msg: error
        }

    }
}


export async function agreeFriendsApplication(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            to_user_code = reqData.to_user_code;
        console.log(reqData, '[[]]]]]]')
        //user_code同意to_user_code的好友申请
        let preback = {};

        const exit_model = await FriendsInfoModel.findOne({
            $or: [{
                user_code, to_user_code,
            }, { user_code: to_user_code, to_user_code: user_code }]
        })
        if (!!exit_model) {
            preback = {
                code: 500,
                msg: 'has_apply'
            }
        } else {
            let model_obj = {
                order_id: uuidv1(),
                user_code: to_user_code,
                to_user_code: user_code,
                create_time: moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')
            }
            const model = new FriendsInfoModel(model_obj)
            await model.save(() => {

            });
            preback = {
                code: 200,
                msg: 'success'
            }



            const content = `agree`;

            await setRecordByUserCode(to_user_code, user_code, content);


            await setNewFriend(user_code, to_user_code)

            //发送socket


        }

        ctx.body = preback



    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

export async function getFriendsList(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code;

        const record_list = await getFriendsListByUserCode(user_code);



        let user_info_list = new Set();

        record_list.forEach((item) => {
            user_info_list.add(item.user_code);
            user_info_list.add(item.to_user_code);
        })

        let user_info = await getUserInfo([...user_info_list])


        ctx.body = {
            code: 200,
            data: {
                friends_list: record_list,
                user_info,
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
