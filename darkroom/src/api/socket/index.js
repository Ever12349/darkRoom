import io from 'socket.io-client'

// const url = 'http://localhost:3000'
// const url = 'http://192.168.43.68:3000'
const url = `${process.env.VUE_APP_BASEURL}`
window.console.log(url, 'socket___URL')
const socket = io(url, {
    transports: ['websocket', 'xhr-polling']
})

import { keep_user_online, saveSocketId } from '@/api'

import {
    setAjaxToken
} from '../index.js'


function dealMessageData(message_data) {
    window.console.log('dealMessageData', message_data)
    for (let user_code in message_data) {
        const l_key = `message!${user_code}!message`;
        localStorage.setItem(l_key, JSON.stringify(message_data[user_code]))
        try {
            window.$app.$store.commit('addNewMessage', {
                user_code, data: message_data[user_code]
            });
        } catch (e) {
            window.console.log(e)
        }
    }
}

socket.on('connect', function () {
    window.console.log('socket 已连接', socket.id)
    window.localStorage.socketId = socket.id;
    keep_user_online({
        socket_id: socket.id,
        token: localStorage.token || null,
    }).then(res => {

        const resData = res.data;
        window.console.log(Boolean(resData.message_data), resData, 'soooooooooo')
        if (resData.code == 200) {
            localStorage.user_code = resData.user_code;
            localStorage.user_status = resData.user_status;
            localStorage.user_name = resData.user_name;


            saveSocketId({
                user_code: resData.user_code,
                socket_id: socket.id
            })

            let flag = Boolean(resData.message_data);
            if (flag) {
                dealMessageData(resData.message_data)
            }

            if (resData.user_status == 0) {//表示用户第一次打开应用
                const token = resData.token;
                localStorage.token = token;
                setAjaxToken(token)//设置请求token
                // new Boolean(resData.message_data)
            }
        }
    }, err => {
        window.console.log(err)
    })
});


socket.on('send_message', function (res) {
    window.console.log('############', res);
    const user_code = res.user_code;

    window.$phoneApp.$store.commit('addNewMessage', { user_code, data: [res] })


})

socket.on('disconnect', function () {
    window.console.log('socket.io disconnect')
})


window.console.log(socket, socket.id, url)
// export default socket

export default socket