import { keyMap } from "../../constants/e-card-keymap";
import urls from "../../constants/urls";
import useUserInfo from "@/stores/user-info";


const userInfoStore = useUserInfo();


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

        // @ts-expect-error 煞笔 uniapp 乱 jb 标类型
        const data = res.data.data as SafeKeyboardResponse;
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
export const getECardToken = async () => {
    try {
        // 0. 验证 token 是否已经存在有效 token
        const token = await validateToken();
        if (token) return token;

        // 1. 获取用户信息
        const studentId = userInfoStore.studentId;
        const password = userInfoStore.getDecryptedCardPwd();
        if (!studentId || !password) {
            uni.showToast({
                title: '请等待用户信息加载完毕',
                icon: 'none',
            })

            return;
        }

        // 2. 获取安全键盘
        const safeKeyboard = await getSafeKeyboard();

        // 3. 加密密码
        if (!safeKeyboard) return;
        const secret = transformToSecret(
            safeKeyboard.randomEncryptedKeys,
            safeKeyboard.imagesOfEncryptedKeys,
            password
        );

        const encryptedPassword = secret + "$1$" + safeKeyboard.uuid;

        // 4. 登录
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

        const data = res.data as ECardSignInResponse;

        // 存入缓存
        uni.setStorageSync('eCardToken', data.access_token);

        return data.access_token;
    } catch (err) {
        uni.showToast({
            title: '获取一卡通信息失败',
            icon: 'none',
        });
    }
}


const validateToken = async () => {
    try {
        // 1. 缓存中是否有 token
        const token = uni.getStorageSync('eCardToken');
        if (!token) return false;

        // 2. 验证 token 是否有效
        const res = await uni.request({
            url: urls.consumeCount,
            method: 'GET',
            header: {
                "Synjones-Auth": `bearer ${token}`
            }
        });

        if (!res || res.statusCode !== 200) {
            uni.removeStorageSync('eCardToken');
            return false;
        }

        return token;
    } catch {
        return false;
    }
}