import request from "@/utils/request";
import CryptoJS from "crypto-js";
// store
import { useLinkOfficialAuth } from "@/stores/link-official-auth";
// constants
import urls from "../../constants/urls";
// types
import type { DataObj } from "./getDynamicData";



const linkOfficialAuth = useLinkOfficialAuth();


/**
 * @description 使用客户端进行统一认证登录
 * @returns 登录是否成功
 */
export const signInToOfficialLocal = async (
    username: string,
    password: string,
    authCode: string,
    dataObj: DataObj,
) => {
    // 登录页面用于记录身份的的临时 cookie
    const onAuthCookie = uni.getStorageSync('Cookie') as string;

    try {
        const encryptedPwd = encryptLinkOfficialPwd(password, dataObj.lt);
        const res = await uni.request({
            method: "POST",
            url: urls.signIn,
            header: {
                'Cookie': onAuthCookie,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                username,
                password: encryptedPwd,
                authCode,
                cookie: onAuthCookie,
                ...dataObj,
            },
            redirect: "manual"
        })

        const cookieFromServer = res.header["Set-Cookie"] as string;
        if (!cookieFromServer) {
            throw new Error('学号、密码或验证码错误');
        }

        const mainCookie = extractCASTGCCookie(cookieFromServer);
        linkOfficialAuth.setMainCookie(mainCookie);

        return true;
    } catch (err) {
        if (err instanceof Error) {
            uni.showToast({
                title: err.message,
                icon: 'none',
                duration: 2000,
            });
        }

        return false;
    }
}


const encryptLinkOfficialPwd = (password: string, lt: string) => {
    const keyHex = CryptoJS.enc.Utf8.parse(lt);
    const encryptLinkOfficialPwd = CryptoJS.DES.encrypt(password, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encryptLinkOfficialPwd.toString();
}


const extractCASTGCCookie = (cookieString: string): string => {
    // Split the input string into individual cookies based on commas
    const cookies = cookieString.split(',');

    for (let cookie of cookies) {
        // Remove leading and trailing whitespace
        cookie = cookie.trim();

        // Split the cookie into its attributes based on semicolons
        const attributes = cookie.split(';');

        // The first attribute contains the name and value
        const nameValue = attributes[0].trim();

        // Find the position of the first '=' character
        const index = nameValue.indexOf('=');

        // Proceed only if '=' is found
        if (index !== -1) {
            const name = nameValue.substring(0, index);
            const value = nameValue.substring(index + 1);

            // Check if the cookie name starts with 'CASTGC'
            if (name.startsWith('CASTGC')) {
                // Return the cookie in the desired format
                return `${name}=${value};`;
            }
        }
    }

    // Return an empty string if 'CASTGC' cookie is not found
    return '';
}



/**
 * @description 使用代理服务器进行统一认证登录
 * @returns 统一认证 cookie 或错误信息
 * @deprecated 请使用 signInToOfficialLocal
 */
export const signInToOfficial = async (
    username: string,
    password: string,
    authCode: string,
    dataObj: DataObj,
) => {
    const cookie = uni.getStorageSync('Cookie') as string;
    const res = await request.POST({
        where: 'linkOfficial',
        route: '/',
        data: {
            username,
            password,
            authCode,
            cookie,
            dataObj,
        },
    })
        .send();


    // 保存登录后的主 cookie
    if (res.ok) {
        linkOfficialAuth.setMainCookie(res.data.data as string);
    }

    return res;
}
