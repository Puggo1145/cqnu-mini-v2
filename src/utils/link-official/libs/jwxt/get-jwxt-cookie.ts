import request from "@/utils/request";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";

const linkOfficialAuth = useLinkOfficialAuth();

export const getJwxtCookie = async () => {
    const jwxtCookie = linkOfficialAuth.jwxtCookie;
    if (jwxtCookie) {
        return jwxtCookie
    };

    try {
        const cookie = linkOfficialAuth.mainCookie;
        const res = await request.POST({
            where: "linkOfficial",
            route: "/getJwxtCookie",
            data: {
                cookie
            }
        })
            .send();

        if (res.ok) {
            linkOfficialAuth.setJwxtCookie(res.data.data as string);
            return res.data.data;
        }
    } catch (err) {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        });

        return null;
    }
}