import {
    checkUserName, getUserInfo, getjwtToken
} from '../../util'
import userInfoModel from '../../orm/mongodb/user_info_model'
import moment from 'moment';

import {Decrypt} from '../../util/secret.js'
// Decrypt();

export async function checkUserNameLegality(ctx, next) {//检查用户名是否合法
    try {
        const reqData = ctx.request.body,
            user_name = reqData.user_name;
        const is_leagl = await checkUserName(user_name);
        ctx.body = {
            code: 200,
            is_legal: is_leagl
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

export async function register(ctx, next) {//用户注册
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            user_name = reqData.user_name,
            password = reqData.password,
            second_password = reqData.second_password;
        console.log(reqData, 'register')

        let preback = {};

        //数据检查

        //检查用户名
        const name_leaglity = await checkUserName(user_name);
        if (!name_leaglity) {
            preback = {
                code: 500,
                error_code: 500001,
                msg: 'user_name illegal'
            }
            return
        }
        //检查密码

        //密码解密
        let new_password_decrypt = Decrypt(password.encrypted_data,password.encrypt_key);
        const password_length = new_password_decrypt.length;
        if (password_length < 6 || password_length > 32) {
            preback = {
                code: 500,
                error_code: 500002,
                msg: 'password_illegal'
            }
            return
        }

        //检查第二个密码
        let new_second_password_decrypt = Decrypt(second_password.encrypted_data,second_password.encrypt_key);
        if (new_second_password_decrypt !== new_password_decrypt) {
            preback = {
                code: 500,
                error_code: 500003,
                msg: 'seccond_password error'
            }
            return
        }

        //检查用户名

        const user_info = await getUserInfo(user_code);
        if (user_info) {
            console.log(user_info, 'user_info')
            const old_user_info = user_info[user_code];

            let new_user_info = {
                user_name: user_name,
                user_code: user_code,
                user_status: 1,
                register_time: moment().utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss')
            };

            const token = getjwtToken(user_code, new_user_info.user_status),
                user_info_model_data = {
                    ...new_user_info,
                    // password:
                }
            console.log('password:',new_password_decrypt,new_second_password_decrypt)
            // userInfoModel.update()

            preback = {
                code: 200,
                msg: 'success',
                user_info: new_user_info,
                token,
            }
        } else {
            preback = {
                code: 500,
                error_code: 500003,
                msg: 'no user data'
            }
        }

        ctx.body = {
            ...preback
        }


    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

