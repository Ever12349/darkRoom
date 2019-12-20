
import {
    getrecordByUserCode, getMessageListByUserCodeToUserCode
} from './util.js'

import {
    getUserInfo, getNowTimeFormat
} from '../../util/index.js'

import {
    redisSet, redisGet, redisHdel
} from '../../util/redis_operation.js'

import redisKeyObj from '../../util/redis_key.js'
// import moment from 'moment';

import { setRecordByUserCode } from '../friends/uitl'

// import {
//     sendMessageBySocket,socketClientBySocketId
// } from '../../socket/index.js'

import {
    sendMessageBySocket,
    socketClientBySocketId,
} from '../../socket/socket_global.js'

import {
    isArray
} from '../../socket/index.js'

import {
    getMessageRecordUnreadNum
} from './util.js'

import MessageInfoModel from '../../orm/mongodb/message_info_model.js'

const uuidv1 = require('uuid/v1')



export async function getMessageList(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = parseInt(reqData.user_code),
            pageNo = parseInt(reqData.pageNo || 1),
            pageSize = parseInt(reqData.pageSize || 20);
        console.log(reqData);
        let result_list;
        const redis_key = `message_list!${user_code}!message_list`;
        if (pageNo === 1) {
            let record_list = await getrecordByUserCode(user_code);

            result_list = record_list.slice((pageNo - 1) * pageSize, pageNo * pageSize);

            redisSet(redis_key, JSON.stringify(record_list))
        } else {

            let record_list = JSON.parse(await redisGet(redis_key));

            result_list = record_list.slice((pageNo - 1) * pageSize, pageNo * pageSize);

        }

        let user_code_list = new Set();
        let unread_num_obj = await getMessageRecordUnreadNum(user_code)

        result_list.forEach((item) => {
            user_code_list.add(item.user_code);
            user_code_list.add(item.to_user_code);

            const item_user_code = parseInt(user_code) === parseInt(item.user_code) ? item.to_user_code : item.user_code;
            item.unread_num = unread_num_obj[item_user_code] || 0;
        })
        // let unread_num_obj = await getMessageRecordUnreadNum(user_code)
        console.log(unread_num_obj)
        let user_info = await getUserInfo([...user_code_list])
        ctx.body = {
            code: 200,
            list: result_list,
            user_info,
        }

    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

export async function sendMessage(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            to_user_code = reqData.to_user_code,
            message = reqData.message;

        console.log('sendMessage', reqData, '')


        let message_obj = {
            order_id: uuidv1(),
            user_code,
            to_user_code,
            message_type_flag: 1,
            message,

            create_time: getNowTimeFormat()
        }

        //向mongodb存储数据

        // let message_data = await MessageInfoModel.create(message_obj)
        // console.log('message_data', message_data)


        //向redis存入最新一条记录

        await setRecordByUserCode(user_code, to_user_code, message, 1)



        ctx.body = {
            code: 200,
            data: message_obj
        }


        //使用socket发送消息

        sendMessageBySocket(to_user_code, message_obj).then()

        // console.log(sendMessageBySocket)



    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}


export async function getMessageListToSomeOne(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            to_user_code = reqData.to_user_code;


        const list = await getMessageListByUserCodeToUserCode(user_code, to_user_code)


        ctx.body = {
            code: 200,
            list,
        }
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

export async function cleanMessageUnreadUnm(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            to_user_code = reqData.to_user_code;
        console.log(reqData.data)

        const redis_key = redisKeyObj.unread_num(user_code),
            fields = `${to_user_code}`;

        await redisHdel(redis_key, fields)

        ctx.body = {
            code: 200, msg: 'success'
        }

    } catch (error) {
        console.log(error)
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

