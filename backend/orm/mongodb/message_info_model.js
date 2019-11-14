//私发消息的记录


import mongoose from '../../config/mongodb.js';

const messageInfoSchema = new mongoose.Schema({
    order_id:{
        type:String,
        required:true
    },
    user_code:{
        type:Number,
        require:true,
    },
    to_user_code:{
        type:Number,
        index:true
    },
    data_status:{
        type:Number,
        default:1,
        enum:[0,1]
    },
    message_type_flag:{//消息种类 1.表示普通信息 2表示通知信息
        type:Number,
        default:1,
        enum:[1,2],
    },
    create_time:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model('messageInfo',messageInfoSchema,'message_info')
