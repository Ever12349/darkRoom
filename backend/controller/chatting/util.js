


import {
    getMessageRecordByUserCode
} from '../friends/uitl.js'


export function getrecordByUserCode(user_code){
    return new Promise(async (resolve,reject)=>{
        const record_list = await getMessageRecordByUserCode(user_code);
        console.log(record_list,'record_listrecord_list');
        resolve(record_list)
    })
}

