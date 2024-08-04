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


type Optional<T> = {
    [P in keyof T]?: T[P];
}
export const updateUserInfo = async (params: Optional<UserInfo>) => {
    const res = await request.POST({
        route: "user/v1/updateUser",
        data: params
    })
        .send();

    return res
}


interface FeedbackParams {
    openid: string;
    type: string;
    content: string;
}
export const submitUserFeedback = async (params: FeedbackParams) => {
    const res = await request.POST<FeedbackParams>({
        route: "user/v1/feedback/add",
        data: params
    })
        .send();

    if (res.ok) {
        return true;
    }
}