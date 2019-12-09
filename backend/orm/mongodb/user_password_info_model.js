const mongoose = require('../../config/mongodb.js')


console.log(1111111111111)
const userPasswordInfoSchema = new mongoose.Schema({
    user_code: {
        type: Number,
        required: true,
        index: true
    },
    password: {
        type: String,
    },
    create_time: {
        type: Date,
        default: Date.now()
    }
})


export default mongoose.model('userPasswordInfo', userPasswordInfoSchema, 'user_password_info')

// export default userPasswordInfoSchema