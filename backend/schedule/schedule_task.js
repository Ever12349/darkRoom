var schedule = require('node-schedule');

const moment = require('moment');

import '../orm/mongodb/user_password_info_model.js'

import {
    redisGet
} from '../util/redis_operation'

import {
    getNewEncryptKey,
    encryptCryptoJs,
    decryptCryptoJS,
    getOldEncryptKey,
    saveEncryptKey,
} from '../util/secret'


//测试用方法

// function everySecond() {
//     let arr = [], i
//     for (i = 0; i++; i < 60) {
//         arr.push(i)
//     }
//     return arr
// }


let rule_of_task_1 = new schedule.RecurrenceRule();
rule_of_task_1.hour = 2;
rule_of_task_1.dayOfWeek = 3;
// rule_of_task_1.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const task_1 = schedule.scheduleJob(rule_of_task_1, async function () {//该定时任务负责重新修改密码加密的任务
    // console.log(Date.now())

    //首先获取旧的的密钥


    // const p_time = moment().subtract(7, 'days').format('yyyy-mm-dd')//如果该定时任务时间间隔更改后，此行代码可能也要更改

    // const redis_key = `password_encrypt_key!${p_time}!password_encrypt_key`;

    // const key_obj = JSON.parse((await redisGet(redis_key) || '{}'));
    const key_obj = await getOldEncryptKey();
    if (key_obj.key) {
        const random_key = key_obj.key, random_iv = key_obj.iv;

        const user_password_info_list = await UserPasswordInfoModel.find();


        const new_key = getNewEncryptKey();

        user_password_info_list.forEach((item, index) => {
            const en_password = item.password,
                de_password = decryptCryptoJS(en_password, random_key, random_iv);//密码解密
            //重新加密

            const re_en_password = encryptCryptoJs(de_password, new_key.key, new_key.iv);

            const user_code = item.user_code

            UserPasswordInfoModel.update({
                user_code,
            }, {
                password: re_en_password
            }).then()

        })

        saveEncryptKey(moment().format('YYYY-MM-DD'))


    }


})