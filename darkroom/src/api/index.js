
// import socket from './socket'
// import './socket'

import axios from 'axios'

import socket, { } from "./socket";

const baseUrl = 'http://localhost:3000'

const api = {
    visitorSendMessage: function (message) {
        axios.post(message)
    }
}

export default function install(Vue) {
    socket.on();
    // Vue.prototype.$myApi = {
    // visitorSendMessage:function(message){
    //     axios.post(message)
    // }
    // }
    Vue.prototype.$myapi = api
}

export function keep_user_online (data){
    window.console.log(data)
    return axios.post(`${baseUrl}/users/keep_user_online`,data)
    // return axios.get(`${baseUrl}/`,data)
}
