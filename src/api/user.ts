import request from "@/utils/request";

export const validateTokenAndSyncUserInfo = async () => {
    const res = await request.GET({
        route: "user/v1/getUserInfo"
    })
        .send();

    if (res.ok) {
        // TODO: 同步用户信息到全局状态
    }

    return res.ok;
}