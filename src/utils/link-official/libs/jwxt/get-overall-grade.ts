import { getJwxtCookie } from "./get-jwxt-cookie";
import { parseOverallGrade } from "../../utils/htmlparser";
import urls from "../../constants/urls";


export const getOverallGrade = async () => {
    try {
        const jwxtCookie = await getJwxtCookie();
        if (!jwxtCookie) return null;

        // 返回的是 html 文档
        const res = await uni.request({
            method: "GET",
            url: urls.overallGrade,
            header: {
                "Cookie": jwxtCookie
            }
        })

        const overallGrade = parseOverallGrade((res.data as string));

        return overallGrade;
    } catch (err) {
        console.log(err);
        uni.showToast({
            title: "校园门户错误，请重试!",
            icon: "none",
            duration: 1200
        })

        return null;
    }
}