const fs = require('fs');
const CryptoJS = require('crypto-js');
const NodeRsa = require('node-rsa')
const path = require('path')
const key_path = path.resolve(__dirname, '../key/public.pem')
const public_key = fs.readFileSync(key_path, 'utf8');

const private_key_path = path.resolve(__dirname, '../key/private.pem');
const private_key = fs.readFileSync(private_key_path, 'utf8');

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

export function Encrypt(word) {
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