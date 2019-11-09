// const mongoose = require('../../config/mongodb.js')


// export default mongoose.model('user_name', new mongoose.Schema({
//     id:{
//         type:Number
//     },
//     user_name:{
//         type:String
//     }
// }),'user_name')


const mongoose = require('../../config/mongodb.js')


const UserNameSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    user_name:{
        type:String
    }

})

export default mongoose.model('UserName',UserNameSchema,'user_name_info')
