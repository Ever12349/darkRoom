import axios from 'axios'

if (localStorage.token) {
    setAjaxToken(localStorage.token)
}

import socket, { } from "./socket";

import {
    isString, isNumber
    // } from '@/util/DataType.js'
} from '../util/dataType.js'


import public_key from '@/pem/secret_key.js'

// const public_key = require('@/pem/secret_key.js')

window.console.log(public_key, 'public_key')


// const baseUrl = 'http://localhost:3000'
// const baseUrl = 'http://192.168.43.68:3000'

const baseUrl = `${process.env.VUE_APP_BASEURL}`
window.console.log(baseUrl, 'baseUrl')

const socket_api = {
    closeSocketConnection() {
        socket.close()
    },
    reConnectionSocket() {
        this.closeSocketConnection();
        socket.open()
    },
    getOnlineUserNum() {
        return axios.get(`${baseUrl}/users/get_user_online_total_num`)
    }
}

export function setNewUserInfo(user_info) {
    try {
        window.$phoneApp.$phoneApp.$store.commit('addNewUserInfo', user_info)
    } catch (error) {
        window.console.log()
    }
}



const message_api = {
    cleanMessageUnreadNum(data) {
        return axios.post(`${baseUrl}/api/clean_message_unread_num`, data)
    },

    getMessageListToSomeOne(data) {//获取与某人的消息记录
        return axios.post(`${baseUrl}/api/get_message_list_to_some_one`, data)
    },

    getMessageRecordList: function (data) {//获取消息记录
        return axios.post(`${baseUrl}/api/get_message_list`, data)
    },

    sendMessage(data) {
        return axios.post(`${baseUrl}/api/send_message`, data)
    }

}

const friends_api = {//好友api接口
    getFriendsList: function (data) {//获取好友列表
        return axios.post(`${baseUrl}/api/get_friends_list`, data)
    },

    agreeFriendsApplication: function (data) {//同意好友申请
        return axios.post(`${baseUrl}/api/agree_friends_application`, data)
    },

    friendsApplication(data) {//好友申请
        return axios.post(`${baseUrl}/api/friends_application`, data)
    },


};


const api = {

    getUserInfoByUserCode: function (user_code) {
        return new Promise((resolve, reject) => {
            if (user_code && (isString(user_code) || isNumber(user_code))) {
                let user_info
                try {
                    user_info = window.$phoneApp.$store.state.user_info_state[user_code];
                } catch (e) {
                    user_info = null;
                }
                // window.console.log(user_info, 'uuuuuuuuuuu______________iiiiiiiiiiiiiiiii');
                if (user_info) {
                    resolve(user_info)
                } else {
                    axios.post(`${baseUrl}/users/get_user_info`, { user_code }).then(res => {
                        if (res.data.code == 200) {
                            resolve(res.data.user_info[user_code]);
                            setNewUserInfo(res.data.user_info);
                        } else {
                            reject('error')
                        }
                    })
                }


            } else {
                reject('参数错误！！！')
            }

        })
    },

    userRegister: function (data) {//用户注册
        return axios.post(`${baseUrl}/users/register`, {
            user_name: data.user_name,
            user_code: data.user_code,
            password: data.password,
            second_password: data.second_password
        })
    },

    userLogin: function (data) {//用户登录
        return axios.post(`${baseUrl}/users/user_login_in`, data)
    },

    checkUserNameLegality: function (user_name, user_code) {//检查用户名是否合法
        window.console.log(user_name, user_code, 'check')
        return axios.post(`${baseUrl}/users/check_user_name_legality`, {
            user_name, user_code
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

    ...socket_api,
    ...friends_api, ...message_api
}

export default function install(Vue) {
    // socket.on();
    Vue.prototype.$myapi = api
}

export function keep_user_online(data) {
    window.console.log(data)
    return axios.post(`${baseUrl}/users/keep_user_online`, data)
}

export function setAjaxToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function saveSocketId(data) {
    socket.emit('save_socket_id', data)
}

export function addNewMessage(data) {
    try {
        const user_code = data.user_code,
            list = data.message_list;
        window.$phoneApp.$store.commit('addNewMessage', { user_code, data: list })
    } catch (error) {
        window.console.log(error)
    }
}


// export function getMessageListKey(user_code) {
//     const key = `message_list!${user_code}`;
//     return key
// }
