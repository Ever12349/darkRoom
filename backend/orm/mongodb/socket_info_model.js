const mongoose = require('../../config/mongodb.js')

const socketInfoSchema = new mongoose.Schema({
    user_code: {
        type: String,
        required: true,
        index: true
    },
    socket_id: {
        type: String
    }
}, { autoIndex: false })


export default mongoose.model('socketInfo', socketInfoSchema, 'socket_info')