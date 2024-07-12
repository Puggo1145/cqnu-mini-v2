import request from "@/utils/request"
// libs
import { getDynamicData } from "../libs/sign-in/getDynamicData";
import { getCaptcha } from "../libs/sign-in/getCaptcha";
// types
import type { DataObj } from "../libs/sign-in/getDynamicData";


export const getSignInSessionAndAuthCode = async () => {
    try {
        const cookie = uni.getStorageSync('Cookie') as string;
        if (cookie.startsWith("CASTGC")) return;

        const dataObj = await getDynamicData();
        const authCodeImg = await getCaptcha();

        return {
            authCodeImg,
            dataObj,
        };
    } catch {
        uni.showToast({
            title: "网络错误，请重试",
            icon: "error",
        })
    }
}

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
    uni.setStorageSync('Cookie', res.data);
}
