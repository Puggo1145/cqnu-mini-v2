import { getJwxtCookie } from "./get-jwxt-cookie";
import urls from "../../constants/urls";


enum CourseQueryTarget {
    obligatories="E04BEC7B693C4613E055000000000001",
    electives="E04BF5DB0641467BE055000000000001",
    generalElectives="E04B433BB70F4371E055000000000001",
    others="qtkcxfyq"
}
interface POSTData {
    xfyqjd_id: CourseQueryTarget,
    cjlrxn: number, // 学年
    cjlrxq: number, // 学期
    bkcjlrxn: number,
    bkcjlrxq: number,
    xscjcxkz: number,
    cjcxkzzt: number,
    cjztkz: number,
}
export const getObligatoryCourses = async (data: POSTData) => {
    try {
        const jwxtCookie = await getJwxtCookie();

        const res = await uni.request({
            url: urls.courseDetails,
            method: "POST",
            header: {
                "Cookie": jwxtCookie
            },
            data: data
        })
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}