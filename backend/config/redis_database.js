const redis = require('redis')
const redis_client = redis.createClient()

// const mongondburl = process.env.MONGODBURL;
// console.log(mongondburl, 'redis')

redis_client.on('err',(err)=>{
    console.log('redis_err',err)
})


module.exports = redis_client;