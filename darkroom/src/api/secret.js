const CryptoJS = require('crypto-js');  //引用AES源码js
import NodeRsa from 'node-rsa'
import {
    isNumber
} from '@/util/dataType.js'

import public_key, { getPrivateKey } from '@/pem/secret_key.js'
const private_key = getPrivateKey();

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

const nodeRsaKey = new NodeRsa(private_key, 'pkcs8-private')
const nodeRsaPubKey = new NodeRsa(public_key, 'pkcs8-public')
//加密方法
export function Encrypt(word) {
    // const nodeRsaKey = new NodeRsa(private_key, 'pkcs8-private')
    const key_string = randomString(), iv_string = randomString();
    const key = CryptoJS.enc.Utf8.parse(key_string),
        iv = CryptoJS.enc.Utf8.parse(iv_string);
    let srcs = CryptoJS.enc.Utf8.parse(word);
    //加密数据
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    //加密密钥与密钥偏移量
    const encrypt_key = nodeRsaKey.encryptPrivate(JSON.stringify({ key: key_string, iv: iv_string }), 'base64', 'utf8');
    return {
        encrypted_data: encrypted.ciphertext.toString().toUpperCase(),
        encrypt_key,
    }
}

export function Decrypt(encrypt_data, encrypt_key) {//数据解密
    try {
        //使用非对称解密密钥
        const key_obj = JSON.parse(nodeRsaPubKey.decryptPublic(encrypt_key, 'utf8'));
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
