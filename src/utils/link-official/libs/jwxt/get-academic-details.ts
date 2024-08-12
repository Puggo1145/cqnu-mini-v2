import { getJwxtCookie } from "./get-jwxt-cookie";
import urls from "../../constants/urls";


const queryTarget = {
    obligatories: "E04BEC7B693C4613E055000000000001",
    electives: "E04BF5DB0641467BE055000000000001",
    generalElectives: "E04B433BB70F4371E055000000000001",
    others: "qtkcxfyq"
}
export const getAcademicDetails = async (target: keyof typeof queryTarget) => {
    try {
        const jwxtCookie = await getJwxtCookie();

        const res = await uni.request({
            url: urls.courseDetails,
            method: "POST",
            header: {
                "Cookie": jwxtCookie,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
                xfyqjd_id: queryTarget[target],
                // cjlrxn: new Date().getFullYear() - 1,
                // cjlrxq: 12, // 统一为为第二学期
            }
        })

        return res.data;
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}
