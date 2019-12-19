


import {
    getMessageRecordByUserCode
} from '../friends/uitl.js'

import MessageInfoModel from '../../orm/mongodb/message_info_model'
import moment from 'moment';


export function getrecordByUserCode(user_code) {
    return new Promise(async (resolve, reject) => {
        const record_list = await getMessageRecordByUserCode(user_code);
        console.log(record_list, 'record_listrecord_list');
        resolve(record_list)
    })
}


export function getMessageListByUserCodeToUserCode(user_code, to_user_code) {//根据user_code与to_user_code查询消息记录
    return new Promise(async (resolve, reject) => {
        let message_list;
        let list = await MessageInfoModel.find({
            $or: [{
                user_code: parseInt(user_code),
                to_user_code: parseInt(to_user_code)
            }, {
                user_code: parseInt(to_user_code),
                to_user_code: parseInt(user_code)
            }],
            data_status: 1
        })
        list.sort((v1, v2) => {
            // if (moment(v1.create_time).isAfter(moment(v2.create_time))) {
            //     return -1
            // } else {
            //     return 1
            // }

            return moment(v1.create_time).isBefore(moment(v2.create_time)) ? -1 : 1;
        })
        message_list = list;
        resolve(message_list)
    })

}
