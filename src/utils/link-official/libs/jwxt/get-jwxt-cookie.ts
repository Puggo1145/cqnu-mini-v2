import request from "@/utils/request";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";

const linkOfficialAuth = useLinkOfficialAuth();

/**
 * @param target BA: 本科生教务系统 MS: 研究生教务系统
 * @returns 教务系统 Cookie
 */
export const getJwxtCookie = async (target: "BA" | "MS" = "BA") => {
    const jwxtCookie = linkOfficialAuth.jwxtCookie;
    if (jwxtCookie) {
        return jwxtCookie
    };

    const cookie = linkOfficialAuth.mainCookie;

    const res = await request.POST({
        where: "linkOfficial",
        route: `/getJwxtCookie?target=${target}`,
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