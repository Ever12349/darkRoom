import axios from 'axios'

if (localStorage.token) {
    setAjaxToken(localStorage.token)
}

import socket, { } from "./socket";


import public_key from '@/pem/secret_key.js'

// const public_key = require('@/pem/secret_key.js')

window.console.log(public_key,'public_key')


// const baseUrl = 'http://localhost:3000'
// const baseUrl = 'http://192.168.43.68:3000'

const baseUrl = `${process.env.VUE_APP_BASEURL}`
window.console.log(baseUrl,'baseUrl')
const api = {
    // visitorSendMessage: function (message) {
    //     axios.post(message)
    // },

    userRegister: function (data) {//用户注册
        return axios.post(`${baseUrl}/users/register`, {
            user_name: data.user_name,
            user_code: data.user_code,
            password: data.password,
            second_password: data.second_password
        })
    },

    checkUserNameLegality: function (user_name) {//检查用户名是否合法
        return axios.post(`${baseUrl}/users/check_user_name_legality`, {
            user_name,
        })
    },

    sendPublicMessage: function (message) {
        return axios.post(`${baseUrl}/api/sendPublicMessage`, {
            user_code: message.user_code,
            to_order_id: message.to_order_id,
            content: message.content
        })
    },

    getPublicMessageList: function (data) {
        return axios.post(`${baseUrl}/api/getPublicMessage`, {
            user_code: data.user_code,
            pageSize: data.pageSize || 10,
            pageNo: data.pageNo || 1
        })
    },

    getReponseMessageList: function (data) {
        return axios.post(`${baseUrl}/api/getPublicMessageResponseByOrderId`, {
            order_id: data.order_id,
            pageNo: data.pageNo || 1,
            pageSize: data.pageSize || 5
        })
    },

    friendsApplication(data) {
        return axios.post(`${baseUrl}/api/friends_application`, {
            user_code: data.user_code,
            to_user_code: data.to_user_code
        })
    }
}

export default function install(Vue) {
    socket.on();
    Vue.prototype.$myapi = api
}

export function keep_user_online(data) {
    window.console.log(data)
    return axios.post(`${baseUrl}/users/keep_user_online`, data)
}

export function setAjaxToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}