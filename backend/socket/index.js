
const socketIo = require('socket.io')
// let socket_server = null;
// import socket_client from './socket_global.js'

// import {
//     redisGet, redisSetEx
// } from '../util/redis_operation.js'


import { saveSocketInfo, clearSocketId, userOnline, getUserCodeBySocketId } from './socket_global.js'

import { reduceUserOnlineNum, setUserOnlineNum } from '../controller/user/user_online.js'
// import SocketInfoModel from '../orm/mongodb/socket_info_model.js'



// export function saveSocketInfo(user_code, socket_id) {//保存socket_id并且增加在线人数
//     if (user_code && socket_id) {
//         SocketInfoModel.findOne({
//             user_code,
//         }).then(res => {
//             console.log(res, '#########')
//             if (!!res) {
//                 SocketInfoModel.updateOne({
//                     user_code,
//                 }, {
//                     socket_id: socket_id
//                 }).then()
//             } else {
//                 SocketInfoModel.create({
//                     user_code, socket_id
//                 }).then()
//             }

//             const redis_key = `socket_id!${user_code}!socket_id`;

//             redisSetEx(redis_key, socket_id, 600, () => { })
//         })
//     } else {
//         throw new Error('参数错误')
//     }
// }


// export function getSocketId(user_code) {
//     return new Promise(async (resolve, reject) => {
//         let redis_key = `socket_id!${user_code}!socket_id`;

//         let scoket_id = await redisGet(redis_key);

//         if (socket_id) {
//             resolve(scoket_id)
//         } else {
//             scoket_id = (await SocketInfoModel.findOne({ user_code })).scoket_id;
//             resolve(scoket_id);
//             redisSetEx(redis_key, scoket_id, 600, () => { })
//         }

//     })
// }

// export function socketClientBySocketId(socket_id) {
//     let client = socket_client.connected[socket_id];
//     return client || false
// }


// export function sendMessageBySocket(to_user_code, message_obj) {
//     return new Promise(async (resolve, reject) => {
//         //获取socket_id;

//         const to_socket_id = await getSocketId(to_user_code);

//         if (to_socket_id) {
//             try {
//                 socketClientBySocketId().emit('send_message', message_obj, (res) => {
//                     console.log(res, 'sockeeeeeee')
//                     resolve(true)
//                 })
//             } catch (error) {
//                 resolve(false)
//             }
//         } else {
//             reject(false)
//         }
//     })
// }




// export function getSocketID(){
//     console.log(socket_server,'io')
// }

// export function get_id(ctx,next){
//     console.log(socket_server)
// }

module.exports = function (server) {
    const io = socketIo(server, () => {
        console.log('2222222222')
    })
    global.socket_server = io;
    io.on('connection', async client => {
        console.log('connection', client.id)
        // let user_code = await getUserCodeBySocketId(client.id)
        await setUserOnlineNum();

        userOnline(client.id).then();



        client.on('save_socket_id', data => {
            // console.log('+++++++++', data, 'ssssss');
            saveSocketInfo(data.user_code, data.socket_id)

        })
        client.on('disconnect', async data => {
            console.log(data, 'disconnect', client.id)
            await reduceUserOnlineNum();
            // userOnline(client.id).then();
            //清空socket_id;
            try {
                let user_code = await clearSocketId(client.id);

                console.log(user_code)

            } catch (error) {
                console.log(error)
            }




        })


    })


}
