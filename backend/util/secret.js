const fs = require('fs');
const CryptoJS = require('crypto-js');
var crypto = require('crypto');

const NodeRsa = require('node-rsa')
const path = require('path')
const key_path = path.resolve(__dirname, '../key/public.pem')
const public_key = fs.readFileSync(key_path, 'utf8');
const moment = require('moment')
const private_key_path = path.resolve(__dirname, '../key/private.pem');
const private_key = fs.readFileSync(private_key_path, 'utf8');
console.log(key_path, '|||', private_key_path)
import {
    isNumber
} from '../util/dataType.js'

import { redisSetEx, redisGet, redisSet } from '../util/redis_operation'

const nodeRsaKey = new NodeRsa(public_key, 'pkcs8-public')//公钥用于解密用

const nodeRsaPriKey = new NodeRsa(private_key, 'pkcs8-private')//私钥用于加密用

function randomString(len = 32) {
    if (len && isNumber(len)) {
        var pwd_length = len || 32
        var new_pwd = "";
        var j = 0;
        var char = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
        const char_length = char.length;
        for (var i = 0; i < parseInt(pwd_length); i++) {
            j = Math.floor(Math.random() * char_length);
            new_pwd += char.charAt(j);
        }
        return new_pwd
    } else {
        return false
    }
}


export function Decrypt(encrypt_data, encrypt_key) {//数据解密
    try {
        //使用非对称解密密钥
        const key_obj = JSON.parse(nodeRsaKey.decryptPublic(encrypt_key, 'utf8'));
        const en_key = key_obj.key,
            en_iv = key_obj.iv
        //使用对称加密解密
        const key = CryptoJS.enc.Utf8.parse(en_key), iv = CryptoJS.enc.Utf8.parse(en_iv);
        let encryptedHexStr = CryptoJS.enc.Hex.parse(encrypt_data);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr
    } catch (e) {
        return false
    }
}

export function Encrypt(word) {//数据加密
    try {
        const key_string = randomString(), iv_string = randomString();
        const key = CryptoJS.enc.Utf8.parse(key_string), iv = CryptoJS.enc.Utf8.parse(iv_string);
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        const encrypt_key = nodeRsaPriKey.encryptPrivate(JSON.stringify({ key: key_string, iv: iv_string }), 'base64', 'utf8');
        return {
            encrypted_data: encrypted.ciphertext.toString().toUpperCase(),
            encrypt_key,
        }
    } catch (e) {
        console.log(e)
        return false
    }
}
// var crypto = require('crypto');
//加密
// function encrypt(str,secret){
// 	var cipher = crypto.createCipher('aes192',secret);
// 	var enc = cipher.update(str,'utf8','hex');
// 	enc += cipher.final('hex');

// 	return enc;
// }

// //解密
// function decrypt(str,secret){
// 	var decipher = crypto.createDecipher('aes192',secret);
// 	var dec = decipher.update(str,'hex','utf8');
// 	dec += decipher.final('utf8');
// 	return dec;
// }


export async function getNewEncryptKey(save_time_string) {//获取新的密钥并将其保存

    //先从redis中查询是否存在密钥
    const time_now_string = save_time_string || moment().format('YYYY-MM-DD');

    // console.log(time_now_string)
    const redis_key = `password_encrypt_key!${time_now_string}!password_encrypt_key`;
    console.log(time_now_string, redis_key)
    const key_obj = await redisGet(redis_key);
    let result_data;
    if (key_obj) {
        result_data = JSON.parse(key_obj);
    } else {

        // const key_of_encrypt_password = `key_of_encrypt_password`

        // const encrypt_data = await redisGet(key_of_encrypt_password)
        // if (encrypt_data) {
        //     const key_path = path.resolve(__dirname, '../key_log', `${time_now_string}.txt`)
        //     const key_string = fs.writeFileSync(key_path, 'utf8')
        //     result_data = JSON.parse(key_string)

        // } else {
        const random_key = randomString(128),
            random_iv = randomString(128);
        result_data = {
            key: random_key,
            iv: random_iv,
            time_string: time_now_string
        }

        // redisSet(key_of_encrypt_password, time_now_string, function () { })

        redisSetEx(redis_key, JSON.stringify(result_data), 4 * 24 * 3600);//将密钥存在redis中

        const file_name = `${time_now_string}.txt`;

        const key_log_path = path.resolve(__dirname, `../key_log/${file_name}`);

        fs.writeFile(key_log_path, JSON.stringify(result_data), (err) => {//将密钥写入文件长时间保存
            if (err) {
                console.log(err)
            } else {
                console.log('写入成功')
            }
        })


        // }
        console.log(key_log_path);

        // return data

    }

    return result_data
}


export function saveEncryptKey(time_string) {
    const redis_key = `key_of_encrypt_password`;
    redisSet(redis_key, time_string, () => { })
}

export function getOldEncryptKey() {//获取旧的密钥
    console.log(path.resolve(__dirname), 11111111)
    return new Promise(async (resolve, reject) => {

        const redis_key = `key_of_encrypt_password`;
        const file_name = await redisGet(redis_key);
        if (!file_name) {
            resolve(null)
        }
        console.log(__dirname, file_name, 2222222)
        const key_log_path = path.resolve(__dirname, `../key_log/${file_name}.txt`);

        const file_str = fs.readFileSync(key_log_path, 'utf8');
        // let aaa
        // // return JSON.parse(file_str)
        // console.log(aaa, __dirname, 3333333)
        console.log(key_log_path, file_str, __dirname, 'file_strfile_str')
        if (file_str) {
            resolve(JSON.parse(file_str))
        } else {
            resolve(null)
        }

    })
}




export function decryptCryptoJS(word, random_key = '123456789', random_iv = '1111111111') {//对称解密

    const key = CryptoJS.enc.Utf8.parse(random_key), iv = CryptoJS.enc.Utf8.parse(random_iv);
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

    return decryptedStr

}

export function encryptCryptoJs(word, random_key = '123456789', random_iv = '1111111111') {//对称加密
    const key = CryptoJS.enc.Utf8.parse(random_key), iv = CryptoJS.enc.Utf8.parse(random_iv);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    const encrypted_string = encrypted.ciphertext.toString().toUpperCase();
    return encrypted_string
}

export async function encryptPassword(password) {
    //获取加密密钥
    let key_obj = await getOldEncryptKey();
    if (!key_obj) {

        key_obj = await getNewEncryptKey();
        console.log('exit exit', key_obj)
        saveEncryptKey(key_obj.time_string)
    }


    const key_str = key_obj.key, iv_str = key_obj.iv;
    const encrypted_string = encryptCryptoJs(password, key_str, iv_str);
    return encrypted_string

}

