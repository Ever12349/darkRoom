
// import socket from './socket'
// import './socket'

import axios from 'axios'

import socket, { } from "./socket";

const baseUrl = 'http://localhost:3000'

const api = {
    visitorSendMessage: function (message) {
        axios.post(message)
    },

    sendPublicMessage:function(message){
        return axios.post(`${baseUrl}/api/sendPublicMessage`,{
            user_code:message.user_code,
            to_order_id:message.to_order_id,
            content:message.content
        })
    },

    getPublicMessageList:function(data){
        return axios.post(`${baseUrl}/api/getPublicMessage`,{
            user_code:data.user_code,
            pageSize:data.pageSize||10,
            pageNo:data.pageNo||1
        })
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

export function setAjaxToken(token){
    axios.defaults.headers.common['Authorization'] = token;
}