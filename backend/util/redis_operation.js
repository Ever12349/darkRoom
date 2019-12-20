
const redisClient = require('../config/redis_database.js')

import {
    isArray, isBoolean, isDate, isFunction, isNull, isNumber, isString, isUndefined
} from '../util/dataType'


export function redisHashGet(hashkey, key) {
    return new Promise((resolve, reject) => {
        redisClient.hget(hashkey, key, ((err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        }))
    })
}

export function redisHashSet(hashkey, key, value, callback) {
    redisClient.hset(hashkey, key, value, (err) => {
        if (callback) {
            callback(err)
        }
    })
}

export function redisHashExists(hsahkey, field) {
    return new Promise(async (resolve, reject) => {
        // console.log(hsahkey, field, 'hsahkey, field')
        // redisHkeys(hsahkey).then(res => {
        //     console.log(res, 'redisHashExists')
        //     resolve(res)
        // })
        redisClient.hexists(hsahkey, field, (err, res) => {
            console.log(res, 'redisHashExists')
            resolve(!!res)
        })
    })
}

export function redisHsahIncr(key, field, value = 1) {
    return new Promise(async (resolve, reject) => {
        //判断是否存在
        const is_exists = await redisHashExists(key, `${field}`);
        console.log(is_exists, key, field, 'is_existsis_exists')
        if (is_exists) {
            redisClient.HINCRBY(key, field, value, (err) => {
                resolve(!err)
            })
        } else {
            redisHashSet(key, field, 1, (err) => {
                resolve(!err)
            })
        }
    })
}

export function redisHdel(key, field) {
    return new Promise(async (resolve, reject) => {
        redisClient.hdel(key, field, (err) => {
            resolve(!err)
        })
    })
}

export function redisHmget(key, filed_list) {
    return new Promise(async (resolve, reject) => {
        redisClient.hmget(key, ...filed_list, (err, res) => {
            resolve(res)
        })
    })
}


export function redisGet(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}


export function redisSet(key, value, callback) {
    redisClient.set(key, value, (err) => {
        callback && callback(err)
    })
}

export function redisSetEx(key, value, times, callback) {
    redisClient.setex(key, times, value, (err) => {
        callback && callback(err)
    })
}

export function redisIncr(key, value = 1) {//某个项目的值+1
    redisClient.exists(key, function (err, res) {
        if (res) {
            redisClient.INCRBY(key, value)
        } else {
            redisClient.set(key, value)
        }
    })
}

export function redisLpush(key, value_list) {
    // console.log(key, value_list, 'redisLpush')
    return new Promise((resolve, reject) => {
        if (isArray(value_list) && (!!value_list.length)) {
            const list = value_list.map((item, idnex) => {
                return JSON.stringify(item)
            })
            redisClient.lpush(key, list.reverse(), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('sucess')
                }
            })
        } else {
            resolve('sucess')
        }

    })
}

export function redislrangeAll(key) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(key, 'redislrangeAll')
            // const redis_length = await redisClient.llen(key);
            // let list_value = await redisClient.LRANGE(key, 0, 1);
            // let list_value = [];

            // redisClient.llen(key, function (err, length) {
            // console.log(,'yyyyyydasdasdasd')
            redisClient.LRANGE(key, 0, -1, (err, list_value) => {
                // console.log(redis_length, list_value, 'list_valuelist_value')
                if (list_value) {
                    list_value = list_value.map((item, index) => {
                        return JSON.parse(item)
                    })

                } else {
                    list_value = [];
                }
                resolve(list_value)

            })
            // })



        } catch (e) {
            console.log(e)
        }
    })
}

export function redisllen(key) {//获取列表的长度
    return new Promise(async (resolve, reject) => {
        redisClient.llen(key, (err, len) => {
            if (err) {
                reject(err)
            } else {
                resolve(len)
            }
        });

    })
}


export function redisExpire(key, seconds) {
    redisClient.expire(key, seconds)
}

export function redisDelKey(key) {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve('success')
            }
        })
    })
}

export function redisHkeys(key) {
    return new Promise((resolve, reject) => {
        if (isString(key)) {
            redisClient.hkeys(key, (err, res) => {
                if (err) {
                    reject('查询错误')
                } else {
                    resolve(res)
                }
            })
        } else {
            reject('参数错误')
        }

    })
}

