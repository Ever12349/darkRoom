
let socket_io, io


import SocketInfoModel from '../orm/mongodb/socket_info_model.js'

function setSocketIoGlobal() {
    if (global.socket_server) {
        socket_io = global.socket_server;
        // console.log(socket_io, 'socket_iosocket_io')
        return false;
    } else {
        setTimeout(() => {
            setSocketIoGlobal()
        }, 50);
    }
}

setSocketIoGlobal()

export default io = socket_io;

// export function get_id() {
//     try {
//         console.log(socket_io.sockets.sockets, 'sssssssssssssss')
//     } catch (e) {

//     }

//     // console.log(global.socket_server)
// }

import {
    redisGet, redisSetEx, redisDelKey
} from '../util/redis_operation.js'

// let socket_client = socket_io;

// import SocketInfoModel from '../orm/mongodb/socket_info_model.js'



export function saveSocketInfo(user_code, socket_id) {//保存socket_id并且增加在线人数
    if (user_code && socket_id) {
        SocketInfoModel.findOne({
            user_code,
        }).then(res => {
            // console.log(res, '#########')
            if (!!res) {
                SocketInfoModel.updateOne({
                    user_code,
                }, {
                    socket_id: socket_id
                }).then()
            } else {
                SocketInfoModel.create({
                    user_code, socket_id
                }).then()
            }

            const redis_key = `socket_id!${user_code}!socket_id`;

            redisSetEx(redis_key, socket_id, 600, () => { })
        })
    } else {
        throw new Error('参数错误')
    }
}


export function getSocketId(user_code) {
    return new Promise(async (resolve, reject) => {
        let redis_key = `socket_id!${user_code}!socket_id`;

        let socket_id = await redisGet(redis_key);

        if (socket_id) {
            resolve(socket_id)
        } else {
            socket_id = (await SocketInfoModel.findOne({ user_code })).socket_id;
            resolve(socket_id);
            redisSetEx(redis_key, socket_id, 600, () => { })
        }

    })
}

export function socketClientBySocketId(socket_id) {
    // console.log('+++++++++++', socket_io, socket_client)
    // console.log(socket_id, 'socket_id')
    // console.log(socket_io.sockets.connected)

    let client = socket_io.sockets.connected[socket_id];
    // console.log(socket_io.sockets)
    return client || false
}


export function sendMessageBySocket(to_user_code, message_obj) {
    return new Promise(async (resolve, reject) => {
        //获取socket_id;

        const to_socket_id = await getSocketId(to_user_code);

        if (to_socket_id) {
            try {
                socketClientBySocketId(to_socket_id).emit('send_message', message_obj, (res) => {
                    console.log(res, 'sockeeeeeee')
                    resolve(true)
                })
                resolve(true)
                // console.log('ssssssssss+++++++++++++++++',socketClientBySocketId(to_socket_id))
            } catch (error) {
                console.log(error)
                resolve(false)
            }
        } else {
            reject(false)
        }
    })
}


export function getUserCodeBySocketId(socket_id) {
    return new Promise(async (resolve, reject) => {
        const user_socket = await SocketInfoModel.findOne({
            socket_id
        })
        if (user_socket) {
            resolve(user_socket.user_code)
        } else {
            resolve(false)
        }
    })
}


export function clearSocketId(socket_id) {
    return new Promise(async (resolve, reject) => {
        //获取user_code | | 清空mongodb数据 || 清空redis数据

        const user_code = await getUserCodeBySocketId(socket_id)

        if (user_code) {

            await SocketInfoModel.updateOne({
                socket_id,
            }, {
                socket_id: null
            })


            //清空redis数据

            const redis_key = `socket_id!${user_code}!socket_id`;

            await redisDelKey(redis_key)

            resolve(user_code)


        } else {
            reject('该用户已经清空')
        }
    })
}





// export function saveSocketInfo(user_code, socket_id) {//保存socket_id并且增加在线人数
//     if (user_code && socket_id) {
//         SocketInfoModel.findOne({
//             user_code,
//         }).then(res => {
//             console.log(res, '#########')
//             if (!!res) {
//                 SocketInfoModel.updated({
//                     user_code,
//                 }, {
//                     socket_id: socket_id
//                 }).then()
//             } else {
//                 SocketInfoModel.create({
//                     user_code, socket_id
//                 }).then()
//             }
//         })
//     } else {
//         throw new Error('参数错误')
//     }
// }


// export function saveSocketId() {

// }
