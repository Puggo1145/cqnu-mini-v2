import request from "@/utils/request";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";
import type { DataObj } from "./getDynamicData";

const linkOfficialAuth = useLinkOfficialAuth();

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
