// const mongoose = require('mongoose')

const mongoose = require('../../config/mongodb.js')

const UserinfoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    user_code: {
        type: Number,
        required: true,
        index: true
    },
    user_name: {
        type: String
    },
    data_status: {//用户状态
        type: Number,
        default: 1
    },
    // password:{//密码
    //     type:String
    // },
    user_status: {//表示用户是否注册 1，表示已注册 0表示未注册
        type: Number,
        default: 0,
        enum:[0,1]
    },
    register_time: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('UserInfo', UserinfoSchema, 'user_info')

