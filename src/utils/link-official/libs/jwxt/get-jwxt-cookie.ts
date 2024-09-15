import request from "@/utils/request";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";

const linkOfficialAuth = useLinkOfficialAuth();

export const getJwxtCookie = async () => {
    const jwxtCookie = linkOfficialAuth.jwxtCookie;
    if (jwxtCookie) {
        return jwxtCookie
    };

    const cookie = linkOfficialAuth.mainCookie;

    const res = await request.POST({
        where: "linkOfficial",
        route: "/getJwxtCookie",
        data: {
            cookie
        },
        customFailMessage: "校园门户错误"
    })
        .send();

    if (res.ok) {
        linkOfficialAuth.setJwxtCookie(res.data.data as string);

        return res.data.data as string;
    } else {
        return false;
    }
}