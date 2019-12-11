import {
    checkUserName, getUserInfo, getjwtToken, upDateUserInfo, updatePassword
} from '../../util'
import userInfoModel from '../../orm/mongodb/user_info_model'
import moment from 'moment';

import { Decrypt, encryptPassword, encryptCryptoJs } from '../../util/secret.js'

import UserInfoModel from '../../orm/mongodb/user_info_model.js'
import UserPasswordModel from '../../orm/mongodb/user_password_info_model.js'
// Decrypt();

export async function checkUserNameLegality(ctx, next) {//检查用户名是否合法
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code,
            user_name = reqData.user_name;
        console.log(reqData, 'ccccccccccccc')
        const is_leagl = await checkUserName(user_name, user_code);
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
            user_code = parseInt(reqData.user_code),
            user_name = reqData.user_name,
            password = reqData.password,
            second_password = reqData.second_password;
        console.log(reqData, 'register')

        let preback = {};

        //数据检查

        //检查用户名
        const name_leaglity = await checkUserName(user_name, user_code);
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
        let new_password_decrypt = Decrypt(password.encrypted_data, password.encrypt_key);
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
        let new_second_password_decrypt = Decrypt(second_password.encrypted_data, second_password.encrypt_key);
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
        console.log(user_info, 'ooooooooooooo')
        if (user_info) {
            console.log(user_info, 'user_info')
            const old_user_info = user_info[user_code];

            let new_user_info = {
                user_name: user_name,
                user_code: parseInt(user_code),
                user_status: 1,
                register_time: moment().utcOffset('+08:00').format('YYYY-MM-DD HH:mm:ss')
            };

            const token = getjwtToken(user_code, new_user_info.user_status),
                user_info_model_data = {
                    ...new_user_info,
                    // password:await encryptPassword(password)
                }

            console.log('password:', user_info_model_data)
            // userInfoModel.update()
            upDateUserInfo(new_user_info).then();
            updatePassword(user_code, await encryptPassword(new_password_decrypt)).then()

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


export async function userLoginin(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_id = reqData.user_id,
            en_password = password;
        let preback
        //检查用户名

        //对密码进行解密

        const password = Decrypt(en_password.encrypted_data, en_password.encrypt_key);

        const valivate_password = encryptCryptoJs(password);//密码再加密
        //假设用户输入的是用户名

        const user_info_list = await userInfoModel.find({
            $or: [{
                user_code: user_id
            }, {
                user_name: user_id
            }],
            user_status: 1
        })
        let list_len = user_info_list.length;
        if (!!list_len) {
            let is_passing = false, new_user_info;
            for (let i = 0; i < list_len; i++) {
                const user_info = user_info_list[i];
                let result = await UserPasswordModel.findOne({
                    user_code: user_info.user_code,
                    password: valivate_password
                })
                if (result) {
                    is_passing = true;
                    new_user_info = user_info;
                    break;
                }
            }
            preback = is_passing ? {
                code: 200,
                msg: 'success',
                user_info: new_user_info
            } : {
                    code: 500,
                    msg: 'no valivate' //用户名或者密码错误
                }
        } else {
            preback = {//表示没有该用户的信息
                code: 500,
                msg: 'no user info'
            }
        }

        ctx.body = preback
    } catch (e) {
        console.log(e)
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

export async function getUserInfoByUserode(ctx, next) {
    try {
        const reqData = ctx.request.body,
            user_code = reqData.user_code;

        const user_info = await getUserInfo(user_code);
        ctx.body = {
            code: 200,
            user_info,
        }
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 500,
            msg: 'error'
        }
    }
}

