import io from 'socket.io-client'

// const url = 'http://localhost:3000'
// const url = 'http://192.168.43.68:3000'
const url = `${process.env.VUE_APP_BASEURL}`
window.console.log(url, 'socket___URL')
const socket = io(url)

import { keep_user_online } from '@/api'

import {
    setAjaxToken
} from '../index.js'

socket.on('connect', function () {
    window.console.log('socket 已连接', socket.id)
    window.localStorage.socketId = socket.id;
    keep_user_online({
        socket_id: socket.id,
        token: localStorage.token || null,
    }).then(res => {
        window.console.log(res.data, 'soooooooooo')
        const resData = res.data;
        if (resData.code == 200) {
            localStorage.user_code = resData.user_code;
            localStorage.user_status = resData.user_status;
            localStorage.user_name = resData.user_name;
            if (resData.user_status == 0) {//表示用户第一次打开应用
                const token = resData.token;
                localStorage.token = token;
                setAjaxToken(token)//设置请求token
            }
        }
    }, err => {
        window.console.log(err)
    })
});

window.console.log(socket, socket.id, url)
// export default socket

export default socket