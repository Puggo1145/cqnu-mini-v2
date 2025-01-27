import { useLinkOfficialAuth } from "@/stores/link-official-auth";
import { requestWithRedirect } from "@/utils/request-with-redirect";
import urls from "../../constants/urls";

const linkOfficialAuth = useLinkOfficialAuth();

export const getReservationSysCookie = async () => {
    const cookie = linkOfficialAuth.mainCookie;
    if (!cookie) {
        throw new Error('请登录');
    }
    
    try {
        const res = await requestWithRedirect({
            method: "GET",
            url: urls.reservationSysCookie,
            header: {
                'Cookie': cookie,
            }
        });

        // 获取最终的 cookie
        const finalCookies = res.cookies;
        if (!finalCookies) {
            throw new Error('无法获取访问凭证，请重试');
        }

        const reservationSysCookie = Object.keys(finalCookies)
            .filter((name) => name === "SESSION")
            .map((name) => `${name}=${finalCookies[name]}`)
            .join("; ");
        console.log(reservationSysCookie);
        
        linkOfficialAuth.setReservationSysCookie(reservationSysCookie);

        return reservationSysCookie;
    } catch (error) {
        console.error('无法获取访问凭证，请重试:', error);
        throw error;
    }
}