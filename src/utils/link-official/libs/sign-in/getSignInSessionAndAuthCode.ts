import { getDynamicData } from "./getDynamicData";
import { getCaptcha } from "./getCaptcha";

export const getSignInSessionAndAuthCode = async () => {
    try {
        // const cookie = uni.getStorageSync('Cookie') as string;
        // if (cookie.startsWith("CASTGC")) return;

        const dataObj = await getDynamicData();
        const authCodeImg = await getCaptcha();

        uni.hideLoading();

        return {
            authCodeImg,
            dataObj,
        };
    } catch {
        uni.showToast({
            title: "网络错误，请重试",
            icon: "error",
            duration: 1200
        })
    }
}