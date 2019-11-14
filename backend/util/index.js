
const jsonwebtoken = require('jsonwebtoken')

const randomName = require('random-name')

const redisClient = require('../config/redis_database.js')

// function isNameRepeat(user_name){//检查名字是否重复

// }

import {
    isArray, isBoolean, isDate, isFunction, isNull, isNumber, isString, isUndefined
} from './dataType.js'

import {
    redisHashGet,
    redisGet,
    redisSet,
    redisSetEx,
    redisHashSet,
    redisIncr,
    redisLpush,
    redislrangeAll,
    redisllen,
    redisExpire,
    redisDelKey
} from './redis_operation.js'

import UserInfoModel from '../orm/mongodb/user_info_model.js'
import UserNameModel from '../orm/mongodb/user_name_model.js'
import UserCodeModel from '../orm/mongodb/user_code_model.js'
import PublicMessageModel from '../orm/mongodb/public_message_model.js'


export async function getRandonUserName() {//随机获取一个不重复user_name
    const maxCount = await UserInfoModel.countDocuments();
    const user_name_data = await UserNameModel.findOne({ id: maxCount })
    return user_name_data.user_name
}

export async function getUserCode() {//获取一个用户编号
    const maxCount = await UserInfoModel.countDocuments();
    const user_code_data = await UserCodeModel.findOne({ id: maxCount })
    return user_code_data.user_code
}

export function getjwtToken(user_code, user_status) {//获取jwttoken
    const privateKey = process.env.JWTKEY;
    const token = jsonwebtoken.sign({
        user_code: user_code.toString(),
        user_status: user_status
    }, privateKey);

    return token;
}

export async function saveUserInfomation(user_data) {//保存用户信息
    const maxCount = await UserInfoModel.countDocuments();
    const user_model = new UserInfoModel({
        id: maxCount + 1,
        user_code: user_data.user_code,
        user_name: user_data.user_name,
        user_status: user_data.user_status
    })
    user_model.save();
}

export function verifyJwtToken(token) {//翻译jwt_token
    const privateKey = process.env.JWTKEY;
    const data = jsonwebtoken.verify(token, privateKey);
    return data;
}

export function getMessageDetailByOrderId(order_id) {//通过order_id查找消息详情
    return new Promise(async (resolve, reject) => {
        const redis_key = `public_message_detail!${order_id}`;
        const redis_data = await redisGet(redis_key);
        let response_data
        if (redis_data) {
            response_data = JSON.parse(redis_data)
        } else {
            response_data = await PublicMessageModel.findOne({
                order_id: order_id,
                data_status: 1
            })
            if (response_data) {
                const key = `public_message_detail!${response_data.order_id}`
                redisSetEx(key, JSON.stringify(response_data), 600)
            }
        }
        resolve(response_data)
    })
}

export function setNewPublicMessageNum() {//如果有新发送的消息调用该方法可以重新设置新消息数量
    const redis_key = `newPublicMessageNum`;
    redisIncr(redis_key)
}

export function getNewPublicMessageNum() {//获取当前新发送消息的数量
    const redis_key = `newPublicMessageNum`;
    return new Promise(async (resolve, reject) => {
        const num = parseInt(await redisGet(redis_key))
        redisSet(redis_key, 0)
        resolve(num || 0)
    })
}


export function savePublicMessageList(new_message_list) {//保存公共存储
    //判断该存储是否存在

    const public_message_list_key = `public_message_list`;
    return new Promise(async (resolve, reject) => {
        const list_len = await redisllen(public_message_list_key)
        if (!!list_len) {//表示列表存在
            // await redisDelKey(public_message_list_key)
            await redisLpush(public_message_list_key, new_message_list);
            redisExpire(public_message_list_key, 600)
        } else {
            let message_list = await PublicMessageModel.find({
                data_status: 1
            }).sort({
                create_time: -1
            }).limit(1000)
            await redisDelKey(public_message_list_key, )
            await redisLpush(public_message_list_key, message_list);
            redisExpire(public_message_list_key, 600)

        }
        resolve('sucess')
    })

}

export function getPublicMessageList() {
    return new Promise(async (resolve, reject) => {
        const key = `public_message_list`;
        const redis_public_message_list = await redislrangeAll(key);
        if (!!redis_public_message_list.length) {
            resolve(redis_public_message_list)
        } else {
            let message_list = await PublicMessageModel.find({
                data_status: 1
            }).sort({
                create_time: -1
            }).limit(1000)
            resolve(message_list)
            await redisDelKey(key)
            redisLpush(key, message_list)
            redisExpire(key, 600)
        }
    })
}

export function savePublicMessageListByUserCode(user_code, message_list) {
    const redis_key = `public_message_list!${user_code}!public_message_list`;
    redisDelKey(redis_key).then(res => {
        redisLpush(redis_key, message_list)
        if (res === 'sucess') {
        }
    })
}


export function getPublicMessageListByUserCode(user_code) {
    return new Promise((resolve, reject) => {
        const redis_key = `public_message_list!${user_code}!public_message_list`;
        redislrangeAll(redis_key).then((res) => {
            resolve(res)
        })
    })
}


export function getUserInfo(value) {
    return new Promise(async (resolve, reject) => {
        let user_info_obj = {}
        if (isArray(value)) {
            let promises = value.map((user_code) => {
                return new Promise(async (resolve_1, reject_1) => {
                    const redis_key = `user_info!${user_code}!user_info`;
                    let user_info = await redisGet(redis_key);
                    if (user_info) {
                        user_info_obj[user_code] = JSON.parse(user_info)
                    } else {
                        user_info = await UserInfoModel.findOne({
                            user_code,
                        })
                        user_info_obj[user_code] = user_info;
                        redisSetEx(redis_key, JSON.stringify(user_info), 600);
                    }
                    resolve_1('sucess')
                })
            })
            await Promise.all(promises)
        } else if (isString(value)) {
            const redis_key = `user_info!${user_code}!user_info`;
            let user_info = await redisGet(redis_key);
            if (user_info) {
                user_info_obj[user_code] = JSON.parse(user_info)
            } else {
                user_info = await UserInfoModel.findOne({
                    user_code: vaue,
                })
                user_info_obj[user_code] = user_info;
                redisSetEx(redis_key, JSON.stringify(user_info), 600);
            }

        } else {
            reject('参数错误')
        }

        resolve(user_info_obj)
    })
}

export function getPublicMessageResponseNum(order_id) {
    return new Promise(async (resolve, reject) => {
        let redis_key = `public_message_response_num!${order_id}`;
        let num = parseInt(await redisGet(redis_key));
        resolve(num || 0)
        redisSet(redis_key, 0);
    })
}

export function getReponseListByOrderIdAll(order_id, user_code) {
    return new Promise(async (resolve, reject) => {
        let redis_key = `reponse_list!${order_id}!reponse_list`;
        let num = await getPublicMessageResponseNum(order_id);
        let list
        if (num <= 0) {
            list = await redislrangeAll(redis_key);
            if ((!list) || (!list.length)) {
                list = await PublicMessageModel.find({
                    data_status: 1,
                    to_order_id: order_id
                }).sort({
                    create_time: -1
                }).limit(500)
                resolve(list);
                await redisDelKey(redis_key)
                await redisLpush(redis_key, list);
                redisExpire(redis_key, 600)
            } else {
                resolve(list);
            }
        } else {
            list = await PublicMessageModel.find({
                data_status: 1,
                to_order_id: order_id
            }).sort({
                create_time: -1
            }).limit(500)
            resolve(list);
            await redisDelKey(redis_key)
            await redisLpush(redis_key, list);
            redisExpire(redis_key, 600)
        }
        if (isNumber(user_code)) {
            redis_key = `reponse_list!${order_id}!reponse_list!${user_code}!reponse_list`;
            await redisDelKey(redis_key)
            await redisLpush(redis_key, list);
            redisExpire(redis_key, 600)
        }
    })
}

export function getResponseListByuserCodeAndOrderId(order_id, user_code) {
    return new Promise(async (resolve, reject) => {
        let redis_key = `reponse_list!${order_id}!reponse_list!${user_code}!reponse_list`;
        let list = await redislrangeAll(redis_key);
        if (list && (!!list.length)) {
            resolve(list);
        } else {
            list = await PublicMessageModel.find({
                data_status: 1,
                to_order_id: order_id
            }).sort({
                create_time: -1
            }).limit(500)
            resolve(list);
            await redisDelKey(redis_key)
            redisLpush(redis_key, list);
            redisExpire(redis_key, 600);
        }
    })
}

export function setNewPublicResponseMessageNum(order_id) {
    let redis_key = `public_message_response_num!${order_id}`;
    redisIncr(redis_key)
}



export function checkUserName(user_name) {
    return new Promise(async (resplve, reject) => {
        if (isString(user_name)) {
            UserInfoModel.findOne({
                user_name: user_name
            }).then(res => {
                if (!res) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })

        } else {
            reject('参数错误')
        }
    })
}

