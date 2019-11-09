const mongoose = require('../../config/mongodb.js')

const PublicMessageSchema = new mongoose.Schema({
    order_id:{
        type:String,
        index:true,
        required:true,
    },
    to_order_id:{
        type:String
    },
    user_code:{
        type:Number,
        required:true
    },
    to_user_code:{
        type:Number,
    },
    content:{
        type:String
    },
    data_status:{
        type:Number,
        enum:[0,1],
        default:1,
    },
    create_time:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('PublicMessageModel',PublicMessageSchema,'public_message_info')