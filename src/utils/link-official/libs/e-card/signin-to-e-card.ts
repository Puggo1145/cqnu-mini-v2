import { keyMap } from "../../constants/e-card-keymap";
import urls from "../../constants/urls";


const transformToSecret = (
    randomEncryptedKeys: string, // 密文字符
    imagesOfEncryptedKeys: string[], // 密文图片
    password: string // 密码
) => {
    const inverseMap: { [base64: string]: string } = {};

    // 创建反向映射：base64 -> 字符
    for (const [char, base64] of Object.entries(keyMap)) {
        inverseMap[base64] = char;
    }

    // 匹配随机图片并构建字符顺序
    const characterOrder = imagesOfEncryptedKeys.map(base64 => {
        return inverseMap[base64] || '?';  // 如果没找到匹配项，用 '?' 表示
    });

    // 映射真实字符和加密字符
    const charMap: { [char: string]: string } = {};
    for (let i = 0; i < characterOrder.length; i++) {
        charMap[characterOrder[i]] = randomEncryptedKeys[i];
    }

    // 生成密文
    const secret = password.split('').map(char => {
        return charMap[char] || '?';  // 如果没找到匹配项，用 '?' 表示
    }).join('');

    return secret;
}


interface SafeKeyboardResponse {
    lowerLetterKeyboard: string;
    lowerLetterKeyboardImage: string[];
    upperLetterKeyboard: string;
    upperLetterKeyboardImage: string[];
    numberKeyboard: string;
    numberKeyboardImage: string[];
    symbolKeyboard: string;
    symbolKeyboardImage: string[];
    uuid: string;
}
const getSafeKeyboard = async () => {
    try {
        const res = await uni.request({
            url: urls.safeKeyboard,
            method: 'GET',
        });

        if (res.statusCode !== 200) {
            uni.showToast({
                title: '获取一卡通信息失败',
                icon: 'none',
            })

            return;
        }

        const data = res.data as SafeKeyboardResponse;
        const randomEncryptedKeys = data.lowerLetterKeyboard + data.upperLetterKeyboard + data.numberKeyboard + data.symbolKeyboard;
        const imagesOfEncryptedKeys = [...data.lowerLetterKeyboardImage, ...data.upperLetterKeyboardImage, ...data.numberKeyboardImage, ...data.symbolKeyboardImage];

        return {
            randomEncryptedKeys,
            imagesOfEncryptedKeys,
            uuid: data.uuid,
        }
    } catch {
        uni.showToast({
            title: '获取一卡通信息失败',
            icon: 'none',
        })
    }
}


interface ECardSignInResponse {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
}
export const getECardToken = async (
    studentId: string,
    password: string,
) => {
    try {
        // 1. 获取安全键盘
        const safeKeyboard = await getSafeKeyboard();

        // 2. 加密密码
        if (!safeKeyboard) return;
        const secret = transformToSecret(
            safeKeyboard.randomEncryptedKeys,
            safeKeyboard.imagesOfEncryptedKeys,
            password
        );

        const encryptedPassword = secret + "$1$" + safeKeyboard.uuid;

        // 3. 登录
        const res = await uni.request({
            url: urls.eCardSignIn,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic bW9iaWxlX3NlcnZpY2VfcGxhdGZvcm06bW9iaWxlX3NlcnZpY2VfcGxhdGZvcm1fc2VjcmV0"
            },
            data: {
                username: studentId,
                password: encryptedPassword,
                grant_type: "password",
                scope: "all",
                loginForm: "pc",
                logintype: "snoNew"
            }
        });

        if (res.statusCode !== 200) {
            uni.showToast({
                title: (res.data as { message: string }).message || '获取一卡通信息失败',
                icon: 'none',
            });

            return;
        }

        return (res.data as ECardSignInResponse).access_token;
    } catch {
        uni.showToast({
            title: '获取一卡通信息失败',
            icon: 'none',
        });
    }
}
