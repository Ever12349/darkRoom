
const uuidv1 = require('uuid/v1')


import {
    redisHashGet,
    redisHashSet,
    redisHkeys,
    redisDelKey,
    redisSet,
    redisGet,
    redisLpush,
    redislrangeAll,
    redisIncr
} from '../../util/redis_operation'

import {
    isString
} from '../../util/dataType.js'

import MessageInfoModel from '../../orm/mongodb/message_info_model.js'

import FriendsInfoModel from '../../orm/mongodb/friends_info_model.js'

import moment from 'moment'


export function setRecordByUserCode(user_code, to_user_code, message, type_flag = 1) {
    //user_code，表示发送信息的用户，to_user_code,表示接受信息的用户
    return new Promise(async (resolve, reject) => {

        //存储两条记录
        //1.向user_code中存储一条数据

        // if (isString(content)) {

        let record = {
            order_id: uuidv1(),
            user_code: user_code,
            to_user_code: to_user_code,
            message_type_flag: type_flag,
            create_time: moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss'),
            message,
        }

        let redis_key = `message_record!${user_code}!message_record`;//存储第一条记录
        let h_field = `${to_user_code}`//存储第一条记录
        redisHashSet(redis_key, h_field, JSON.stringify(record));//存储第一条记录

        redis_key = `message_record!${to_user_code}!message_record`;//存储第二条数据
        h_field = `${user_code}`//存储第二条数据
        redisHashSet(redis_key, h_field, JSON.stringify(record));//存储第二条记录

        resolve(record)
        const model = new MessageInfoModel(record)
        model.save();
        console.log(model, 'model++++++++++++++++')

        //用户未读消息增加一条


        // const key_of_unread = `unread_message_num!${to_user_code}!unread_message_num`;
        // redisIncr(key_of_unread)
        // redisSet()

        // } else {
        //     reject('参数错误')
        // }

    })
}

function parseMessageRecord(content) {
    if (isString(content)) {
        // 948541271812&&&863967768708&&&application

        let obj = {}, record = content.split('&&&')
        obj = {
            user_code: record[0],
            to_user_code: record[1],
            action: record[2]
        }
        return obj
    } else {
        return false
    }
}

export function getMessageRecordByUserCode(user_code) {
    return new Promise(async (resolve, reject) => {
        const redis_key = `message_record!${user_code}!message_record`;
        console.log(redis_key, '#########vvvvvvvvvvvvv###################')
        let record_list = await redisHkeys(redis_key);

        console.log(record_list);

        let promises = [], result_list;

        record_list.forEach((content, index) => {
            promises[index] = new Promise(async (resolve, reject) => {
                let record_message = JSON.parse(await redisHashGet(redis_key, content));
                console.log(record_message)

                // let content_obj = parseMessageRecord(content);

                resolve({
                    // ...content_obj,
                    user_code: record_message.user_code,
                    to_user_code: record_message.to_user_code,
                    message: record_message.message,
                    create_time: record_message.create_time,
                    message_type_flag: record_message.message_type_flag,
                    order_id: record_message.order_id,
                    create_time: record_message.create_time
                })
            })
        })

        result_list = await Promise.all(promises);

        console.log(result_list)

        result_list.sort((v1, v2) => {
            if (moment(v1.create_time).isAfter(moment(v2.create_time))) {
                return -1
            } else {
                return 1
            }
        })
        resolve(result_list)
    })
}


export function getFriendsListByUserCode(user_code) {
    return new Promise(async (resolve, reject) => {
        const redis_key = `new_friends!${user_code}!new_friends`;
        let ishas = await redisGet(redis_key);
        const friends_list_key = `friends_list!${user_code}!friends_list`;
        if (ishas) {
            let friends_list = await FriendsInfoModel.find({
                $or: [{
                    user_code: user_code
                }, {
                    to_user_code: user_code
                }],
                data_status: 1
            }).sort({
                create_time: -1
            })
            resolve(friends_list);
            redisLpush(friends_list_key, friends_list);
        } else {
            let friends_lists = await redislrangeAll(friends_list_key);
            resolve(friends_lists)
        }

    })
}

export function setNewFriend(user_code, to_user_code) {
    return new Promise(async (resolve, reject) => {
        const redis_key_1 = `new_friends!${user_code}!new_friends`,
            redis_key_2 = `new_friends!${to_user_code}!new_friends`;

        redisSet(redis_key_1, true);
        redisSet(redis_key_2, true);

        resolve('success')
    })
}
