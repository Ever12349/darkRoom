// import mongoose from '../../config/mongodb.js'

const mongoose = require('../../config/mongodb.js')

const friendsInfoSchema = new mongoose.Schema({
    order_id:{
        type:String,
        required:true,
    },
    user_code:{//先提出邀请的用户
        type:Number
    },
    to_user_code:{//后来同意添加好友的用户
        type:Number
    },
    data_status:{
        type:Number,
        default:1,
        enum:[0,1]
    },
    create_time:{
        type:Date,
        default:Date.now()
    }
})


export default mongoose.model('friendsInfo',friendsInfoSchema,'friends_info')