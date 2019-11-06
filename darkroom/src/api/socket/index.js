import io from 'socket.io-client'

const url = 'http://localhost:3000'

const socket = io(url)

import {keep_user_online} from '@/api'

socket.on('connect', function(){
    window.console.log('socket 已连接',socket.id)
    window.localStorage.socketId = socket.id;
    keep_user_online({
        socket_id:socket.id
    }).then(res=>{
        window.console.log(res.data)
    },err=>{
        window.console.log(err)
    })
});

window.console.log(socket,socket.id)
// export default socket

export default socket