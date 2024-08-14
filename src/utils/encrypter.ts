// import CryptoJS from "crypto-js";
// import JSEncrypt from "jsencrypt";

// // RSA 公钥 (base64 编码,2048 位)
// const RSA_PUBLIC_KEY = import.meta.env.VITE_RSA_PUBLIC

// // AES 密钥 (256 位)
// const AES_KEY = import.meta.env.VITE_AES_PRIVATE

// /**
//  * @param originalLinker 校园官网登录密码明文
//  */
// export const encryptLinker = (originalLinker: string): string => {
//     const encrypt = new JSEncrypt();
//     encrypt.setPublicKey(RSA_PUBLIC_KEY);
//     const encrypted = encrypt.encrypt(originalLinker);
//     return encrypted || "";
// }

// /**
//  * @param linker 校园官网登录密码密文
//  */
// export const decryptLinker = (linker: string): string => {
//     // 将 Base64 编码的密钥转换为字节数组
//     const keyBase64 = CryptoJS.enc.Base64.parse(AES_KEY);
    
//     // 使用转换后的密钥进行解密
//     const bytes = CryptoJS.AES.decrypt(linker, keyBase64, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return bytes.toString(CryptoJS.enc.Utf8);
// }

// /**
//  * RSA解密
//  * @param encryptedData 待解密的数据
//  * @returns 解密后的数据
//  * @description 测试 rsa 解密
//  * @deprecated
//  */
// export const rsaDecrypt = (encryptedData: string): string => {
//     const RSA_PRIVATE_KEY = `
//     MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCarrZfaX4Lg7eG
//     HFaNHtUMLcrIpi4chvEYVYSSBqVjFkTytNZopjHMyNRs86h1gD3/yQGoNxhzfnbA
//     TUzaEoBAn6HIFjyct2Fd02JRplTHWsIKreUSCIwZV2uoJQIIRXr8NKsNYeMy3xoA
//     KtlEm1+kIWHMoSX5hNcEU9O0T8valabpDmIJpQ43fGpk43z4jGSM+0MyC6Ywf5au
//     Bi7wZ0b8K6Sl6iEh+euAbNUwOBVwS7i08uiWzGRAIstWZbWG6lik96dS3jutTpwi
//     0VesT40DyiOe13j3+TDMcBbvSOZe4zcIO3CFNwIHYiet9yUNkJRWk7oeHDEmTuRd
//     KomrNio/AgMBAAECggEACLZ5oFM1Xdmr/zpeZ7GKZ5a2uumdZE73iprajk0giL3K
//     4W7tOtTNrk7LpF1vKjswgtVkKgD8eBjyAG/6ObhcEAfN2ZLjFCLCMcJD4fx//wCu
//     OGLGKedgWNcTQdPf0u5y+HzQ+759STLG6KaBOXuU/g5BT4DuPilM4ToFjT0Hawb3
//     hmak02ziGsiGU4lPq9UGcOcB7KieLKb56OPMJSmD56Rk0vZwJjmpcifN6FLYIB7V
//     gdqoE46/2/xMxABnHUbKjMB8ljRfdeLoGzGkWrLXvrez1m5WOT3Vm5OdrYI4uqFK
//     arkJDEKwg5T5zu9lXofVzwayhBHAoAscff0XAI0MPQKBgQDGxZGqL+aoIVD/3j6M
//     sEby/Mw59TrltE7kIvHvC6GMfI13v0MJ2uMBb+SFq2Wz0e0FwDYBbWFGDD6OA3ea
//     3IKVreQl5UHmNife3ofu3BV7whcxUZjhf1flqe/4J/58lXP1cJVhbuha7sIdRB65
//     G8H17c4LtVywq56fpCvDDZfzxQKBgQDHN41G16YXDWw29gsKNW31eBa07tSCH0C2
//     b6MspvjDrR/cBBKtZ+eJlCxZooUqUM5x/4Ke0QLbt0LiAXf2AKWQKhRZVNsm8wRX
//     zYt+xfMX1y7wEsWIfItSCoZpzg8jcW4S9F71O/tPu6EoabFJueXld2eAy0YPJK4U
//     3YBjiqXSMwKBgDilk2ax8gUWQZQ5zQ+hKQcUnksiJR/Ta+w+PT6HzQlRcaufuUY0
//     uB7vuWuSthAyEl9iMMHlXyRsVuN3/30FvL1VakCWflpSMrikKI8c745ueNeYTn5t
//     ISqVbIsHMtJkcUCQTjIPPm6zvmRCxpKwY21n0SGrFPhQYItUaRhUZmqVAoGAFyEr
//     BPOatAh57POqGnhTmPFlaYJlJ+prAAN8JX4JWeaq0Uejx4BN0Jpkf8+vuFcDcRbi
//     WoAX3dysJkNXYzd2AYPxMuH4Q9BpS6xwqrpe3AC+0V7MkmkrX84bBwPGnC3aQtce
//     g0iAiCRXtLJ4w/+SYo73dGulabKvh3qkImqBkCMCgYBo0k/uW3x7nzixIfBY0C9t
//     UEllLlGUtVLBsg5s/GB4eE5RIlgQ4b8SWH2/l0IlwwvHlkt6JMlGYb5MIp/MvOHj
//     GqIdR5cY2RbLq1vbWiSZmr6NGT45Y7Dga6dsQYkt5Vr2WbxGrlTilDPecFfM6psH
//     H3u79kr40Y1mEX0N2N1ATQ==
//     `;

//     const decrypt = new JSEncrypt();
//     decrypt.setPrivateKey(RSA_PRIVATE_KEY);
//     const decrypted = decrypt.decrypt(encryptedData);
//     return decrypted || "";
// }
