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


type updateUserInfoParams = {
    openid: string;
} & Partial<UserInfo>
export const updateUserInfo = async (params: updateUserInfoParams) => {
    const res = await request.POST({
        route: "user/v1/updateUser",
        data: params
    })
        .send();

    return res.ok
}

interface UpdateLinkerParams {
    oldLinker: string;
    newLinker: string;
    confirmLinker: string;
}
export const updateLinker = async (params: UpdateLinkerParams) => {
    const res = await request.POST<boolean>({
        route: "user/v1/update-pwd",
        data: params
    })
        .send();

    return res.ok;
}

interface UpdateECardPwdParams {
    cardPwd: string; // rsa 加密
}
export const updateECardPwd = async (params: UpdateECardPwdParams) => {
    const res = await request.POST<boolean>({
        route: "user/v1/update-ecard-pwd",
        data: params
    })
        .send();

    return res.ok;
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


export const getAnnouncement = async () => {
    const res = await request.GET<{ content: string }>({
        route: "user/v1/announcement/least"
    })
        .send();

    return res;
}
