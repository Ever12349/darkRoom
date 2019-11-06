
const socketIo = require('socket.io')

module.exports= function(server){
    const io = socketIo(server,()=>{
        console.log('2222222222')
    })

    io.on('connection', client => {
        console.log('connection',client.id)
        
    })
}