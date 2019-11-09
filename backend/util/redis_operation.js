
const redisClient = require('../config/redis_database.js')



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

export function redisIncr(key) {//某个项目的值+1
    redisClient.exists(key, function (err, res) {
        if (res) {
            redisClient.incr(key)
        } else {
            redisClient.set(key, 1)
        }
    })
}

export function redisLpush(key, value_list) {
    return new Promise((resolve, reject) => {
        if (value_list) {
            const list = value_list.map((item, idnex) => {
                return JSON.stringify(item)
            })
            redisClient.lpush(key, ...list, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('sucess')
                }
            })

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

            redisClient.llen(key, function (err, length) {
                // console.log(,'yyyyyydasdasdasd')
                redisClient.LRANGE(key, 0, length, (err, list_value) => {
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
            })



        } catch (e) {
            console.log(e)
        }
    })
}

export function redisllen(key) {//获取列表的长度
    return new Promise(async (resolve, reject) => {
        redisClient.llen(key,(err,len)=>{
            if(err){
                reject(err)
            }else{
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
