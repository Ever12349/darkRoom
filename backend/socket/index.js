
const socketIo = require('socket.io')
// let socket_server = null;
import './socket_global.js'
module.exports= function(server){
    const io = socketIo(server,()=>{
        console.log('2222222222')
    })
    global.socket_server = io;
    io.on('connection', client => {
        console.log('connection',client.id)
        
    })
}


// export function getSocketID(){
//     console.log(socket_server,'io')
// }

// export function get_id(ctx,next){
//     console.log(socket_server)
// }