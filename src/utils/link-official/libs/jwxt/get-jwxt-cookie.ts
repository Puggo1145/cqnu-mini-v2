import request from "@/utils/request";
import urls from "../../constants/urls";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";

const linkOfficialAuth = useLinkOfficialAuth();


/**
 * @returns 教务系统 Cookie
 */
export const getJwxtCookieLocal = async () => {
    const jwxtCookie = linkOfficialAuth.jwxtCookie;
    if (jwxtCookie) {
        return jwxtCookie
    };

    // 获取统一认证 cookie 来兑换教务系统 cookie
    const mainCookie = linkOfficialAuth.mainCookie;

    try {
        const res = await uni.request({
            method: "GET",
            url: urls.jwxtSignIn,
            header: {
                'Cookie': mainCookie,
            },
        })

        const jwxtCookieFromServer = res.header["Set-Cookie"] as string;
        console.log(jwxtCookieFromServer);

        if (!jwxtCookieFromServer) {
            throw new Error('教学系统错误');
        }

        // 解析 jwxtCookie 并保存到 store
        linkOfficialAuth.setJwxtCookie(jwxtCookieFromServer);
    } catch (err) {
        if (err instanceof Error) {
            uni.showToast({
                title: err.message,
                icon: "none"
            })
        }
    }
}

/**
 * @deprecated 请使用 getJwxtCookieLocal
 * @param target BA: 本科生教务系统 MS: 研究生教务系统
 * @returns 教务系统 Cookie
 */
export const getJwxtCookie = async (target: "BA" | "MS" = "BA") => {
    const jwxtCookie = linkOfficialAuth.jwxtCookie;
    if (jwxtCookie) {
        return jwxtCookie
    };

    // 获取统一认证 cookie 来兑换教务系统 cookie
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