const mongoose = require('../../config/mongodb.js')


const UserCodeSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    user_code:{
        type:Number
    }

})

export default mongoose.model('UserCode',UserCodeSchema,'user_code_info')