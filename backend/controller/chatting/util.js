


import {
    getMessageRecordByUserCode
} from '../friends/uitl.js'

import {
    redisHashGet, redisHkeys, redisHmget
} from '../../util/redis_operation.js'

import redisKey from '../../util/redis_key.js'

import MessageInfoModel from '../../orm/mongodb/message_info_model'
import moment from 'moment';


export function getrecordByUserCode(user_code) {
    return new Promise(async (resolve, reject) => {
        const record_list = await getMessageRecordByUserCode(user_code);
        console.log(record_list, 'record_listrecord_list');
        resolve(record_list)
    })
}


export function getMessageListByUserCodeToUserCode(user_code, to_user_code) {//根据user_code与to_user_code查询消息记录
    return new Promise(async (resolve, reject) => {
        let message_list;
        let list = await MessageInfoModel.find({
            $or: [{
                user_code: parseInt(user_code),
                to_user_code: parseInt(to_user_code)
            }, {
                user_code: parseInt(to_user_code),
                to_user_code: parseInt(user_code)
            }],
            data_status: 1
        })
        list.sort((v1, v2) => {
            // if (moment(v1.create_time).isAfter(moment(v2.create_time))) {
            //     return -1
            // } else {
            //     return 1
            // }

            return moment(v1.create_time).isBefore(moment(v2.create_time)) ? -1 : 1;
        })
        message_list = list;
        resolve(message_list)
    })

}

export function getMessageRecordUnreadNum(user_code) {
    return new Promise(async (resolve, reject) => {
        const redis_key = redisKey.unread_num(user_code);

        let redis_fields = await redisHkeys(redis_key);

        let value_list = await redisHmget(redis_key, redis_fields)

        // console.log(redis_fields, value_list, 'redis_fields')
        let obj = {};

        redis_fields.forEach((string, index) => {
            obj[string] = parseInt(value_list[index])
        })
        console.log(obj, redis_fields, value_list, 'redis_fields')

        resolve(obj);
    })
}


