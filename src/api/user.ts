import request from "@/utils/request";
import useUserInfo from "@/stores/user-info";
import type { UserInfo } from "@/stores/user-info";


export const validateTokenAndSyncUserInfo = async () => {
    const userInfo = useUserInfo()

    const res = await request.GET<UserInfo>({
        route: "user/v1/self"
    })
        .send();

    if (res.ok) {
        userInfo.setUserInfo(res.data.data);
    }

    return res.ok;
}