import { getJwxtCookie } from "./get-jwxt-cookie";
import { parseOverallGrade } from "../../utils/htmlparser";
import urls from "../../constants/urls";


export const getOverallGrade = async () => {
    try {
        const jwxtCookie = await getJwxtCookie();

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
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}