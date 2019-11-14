
const uuidv1 = require('uuid/v1')


import {
    redisHashGet,
    redisHashSet,
    redisHkeys,
    redisDelKey,
    redisSet,
    redisGet,
    redisLpush,
    redislrangeAll
} from '../../util/redis_operation'

import {
    isString
} from '../../util/dataType.js'

import MessageInfoModel from '../../orm/mongodb/message_info_model.js'

import FriendsInfoModel from '../../orm/mongodb/friends_info_model.js'

import momnet from 'moment'


export function setRecordByUserCode(user_code,to_user_code,content,){
    return new Promise(async (resolve,reject)=>{
        const redis_key = `message_record!${to_user_code}!message_record`;
        if(isString(content)){
            await redisHashSet(redis_key,content,true);
            resolve('sucess')

            const model = new MessageInfoModel({
                order_id:uuidv1(),
                user_code:user_code,
                to_user_code:to_user_code,
                message_type_flag:2,
                create_time:moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')
            })
            model.save();
        }else{
            reject('参数错误')
        }  
        
    })
}

export function getMessageRecordByUserCode(user_code){
    return new Promise(async (resolve,reject)=>{
        const redis_key = `message_record!${user_code}!message_record`;
        let record_list = await redisHkeys(redis_key);
        resolve(record_list);

        //删除
        await redisDelKey(redis_key)
    })
}


export function getFriendsListByUserCode(user_code){
    return new Promise(async (resolve,reject)=>{
        const redis_key = `new_friends!${user_code}!new_friends`;
        let ishas = await redisGet(redis_key);
        const friends_list_key = `friends_list!${user_code}!friends_list`;
        if(ishas){
            let friends_list = await FriendsInfoModel.find({
                $or:[{
                    user_code:user_code
                },{
                    to_user_code:user_code
                }]
            }).sort({
                create_time:-1
            })
            resolve(friends_list);
            redisLpush(friends_list_key,friends_list);
        }else{
            let friends_lists = await redislrangeAll(friends_list_key);
            resolve(friends_lists)
        }

    })
}

export function setNewFriend(user_code,to_user_code){
    return new Promise(async (resolve,reject)=>{
        const redis_key_1 = `new_friends!${user_code}!new_friends`,
            redis_key_2 = `new_friends!${to_user_code}!new_friends`;

        redisSet(redis_key_1,true);
        redisSet(redis_key_2,true);

        resolve('success')
    })
}
