import request from "@/utils/request";

export const getJwxtCookie = async () => {
    const jwxtCookie = uni.getStorageSync('JwxtCookie');
    if (jwxtCookie) {
        return jwxtCookie
    };

    try {
        const cookie = uni.getStorageSync('Cookie');
        const res = await request.POST({
            where: "linkOfficial",
            route: "/getJwxtCookie",
            data: {
                cookie
            }
        })
            .send();

        uni.setStorageSync('JwxtCookie', res.data);
        
        return res.data;
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        });

        return null;
    }
}