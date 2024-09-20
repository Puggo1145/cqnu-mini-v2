import request from "@/utils/request";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";

const linkOfficialAuth = useLinkOfficialAuth();


/**
 * @param target BA: 本科生教务系统 MS: 研究生教务系统
 * @returns 教务系统 Cookie
 */
// TODO - 完成研究生和本科生教务系统的接入
export const getJwxtCookie = async (
    // target: "BA" | "MS" = "BA"
) => {
    const jwxtCookie = linkOfficialAuth.jwxtCookie;
    if (jwxtCookie) {
        return jwxtCookie
    };

    // 获取统一认证 cookie 来兑换教务系统 cookie
    const cookie = linkOfficialAuth.mainCookie;

    const res = await request.POST({
        where: "linkOfficial",
        route: `/jwxt/signIn`,
        data: {
            cookie
        },
    })
        .send();

    if (res.ok) {
        linkOfficialAuth.setJwxtCookie(res.data.data as string);

        return res.data.data as string;
    } else {
        return false;
    }
}