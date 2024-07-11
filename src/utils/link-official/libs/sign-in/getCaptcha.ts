// constants
import headers from "../../constants/headers";
import urls from "../../constants/urls";

export const getCaptcha = async () => {
    const res = await uni.request({
        url: urls.captcha,
        header: {
            "Cookie": uni.getStorageSync('Cookie'),
            ...headers.getSessionAndAuthCodeHeader
        },
        responseType: 'arraybuffer',
        timeout: 5000
    });

    return uni.arrayBufferToBase64(res.data as ArrayBuffer);
};