
import PublicMessageModel from '../../orm/mongodb/public_message_model.js'

import {
    getMessageDetailByOrderId,
    getNewPublicMessageNum,
    setNewPublicMessageNum,
    savePublicMessageList,
    getPublicMessageList,
    getPublicMessageListByUserCode,
    savePublicMessageListByUserCode,
    getUserInfo,
    getReponseListByOrderIdAll,
    getResponseListByuserCodeAndOrderId,
    setNewPublicResponseMessageNum
} from '../../util'

import {
    redisLpush,
    redislrangeAll,
} from '../../util/redis_operation.js'


import moment from 'moment'
const uuidv1 = require('uuid/v1');

export async function sendPublicMessage(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            to_order_id = reqData.to_order_id,
            content = reqData.content;
        const order_id = uuidv1();
        let to_user_code
        if (to_order_id) {
            const publicMessageDetail = await getMessageDetailByOrderId(to_order_id);
            to_user_code = publicMessageDetail.user_code;
            // to_user_code = 999999999999
            console.log(to_user_code, 'to_user_code')
        }
        console.log(to_user_code, 'to_user_codeto_user_codeto_user_code')
        const newModel = new PublicMessageModel({
            order_id: order_id,
            to_order_id: to_order_id,
            user_code: user_code,
            to_user_code: to_user_code,
            content: content,
            create_time: moment().utcOffset("+08:00").format('YYYY-MM-DD HH:mm:ss')
        })

        await newModel.save((err, product) => {
            console.log(product, 'product')
        })
        ctx.body = {
            code: 200,
            msg: 'success'
        }


        //后续

        setNewPublicMessageNum()

        if(to_order_id){
            setNewPublicResponseMessageNum(to_order_id)
        }
        //后续socket操作



    } catch (e) {
        console.log(e)
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}


export async function getPublicMessage(ctx, next) {
    try {
        const reqData = ctx.request.body,
            pageSize = reqData.pageSize ? parseInt(reqData.pageSize) : 10,
            pageNo = reqData.pageNo ? parseInt(reqData.pageNo) : 1,
            user_code = reqData.user_code;
        let message_list = [];
        console.log(reqData, 'reqData')
        if (pageNo <= 1) {
            const new_public_message_num = await getNewPublicMessageNum();
            // console.log(new_public_message_num,'new_public_message_num')
            if (new_public_message_num > 0) {//表示有新消息
                const new_public_message_list = await PublicMessageModel.find({
                    data_status: 1
                }).sort({
                    create_time: -1
                }).limit(new_public_message_num)

                console.log(new_public_message_list, 'new_public_message_list')
                //将其放入公共存储
                await savePublicMessageList(new_public_message_list);
            }
            message_list = await getPublicMessageList();

            savePublicMessageListByUserCode(user_code, message_list)

        } else {
            message_list = await getPublicMessageListByUserCode(user_code)
        }

        message_list = message_list.slice(pageSize * (pageNo - 1), pageSize * pageNo)

        let user_code_list = new Set();

        message_list.forEach((item, index) => {
            if (item.to_user_code) {
                user_code_list.add(item.to_user_code);
            }
            user_code_list.add(item.user_code);
        })

        let user_info = await getUserInfo([...user_code_list])

        ctx.body = {
            code: 200,
            data: {
                message_list: message_list,
                user_info,
            }
        }


    } catch (e) {
        console.log(e)
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}


export async function getPublicMessageResponseByOrderId(ctx, next) {
    try {
        const reqData = ctx.request.body;
        const commonData = ctx.header.common_data;
        const user_code = parseInt(commonData.user_code),
            order_id = reqData.order_id,
            pageSize = parseInt(reqData.pageSize||5),
            pageNo = parseInt(reqData.pageNo||1);

        console.log(reqData,commonData,'getPublicMessageResponseByOrderId')
        let reponse_list = [];let total_length = 0;

        if(pageNo<=1){
            reponse_list = await getReponseListByOrderIdAll(order_id,user_code);
            total_length = reponse_list.length;
            if(total_length > pageSize){
                let temp_list = reponse_list.slice(0,3);
                temp_list.push(total_length);
                temp_list.push(reponse_list[total_length-1]);
                reponse_list = temp_list;
            }
        }else{
            reponse_list = await getResponseListByuserCodeAndOrderId(order_id,user_code)
        }
        // let total_length = reponse_list.length;
        console.log(reponse_list,'reponse_list reponse_list')

        // reponse_list = reponse_list.slice(pageSize*(pageNo-1),pageSize*pageNo);

        let user_code_list = new Set();
        reponse_list.forEach((item,index)=>{
            if(item.to_user_code){
                user_code_list.add(item.to_user_code)
            }
            user_code_list.add(item.user_code)
        })



        const user_info = await getUserInfo([...user_code_list]);
        ctx.body = {
            code:200,
            data:{
                list:reponse_list,
                total_length:total_length,
                user_info,
            }
        }

    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

