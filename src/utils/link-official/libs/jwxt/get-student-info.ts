import { getJwxtCookie } from "./get-jwxt-cookie"
import urls from "../../constants/urls"
import { resolveStudentInfo } from "./studentInfoHandler"


export interface OriginalStudentInfo {
    xh: string // 学号
    pyccdm: string // 学生身份（本科 ｜ 研究生）
    jg_id: string // 学院
    bh_id: string // 专业班级
    zyh_id: string // 专业
}
export const getStudentInfo = async () => {
    try {
        const jwxtCookie = await getJwxtCookie();

        const res = await uni.request({
            method: "GET",
            url: urls.studentInfo,
            header: {
                "Cookie": jwxtCookie
            }
        })

        const resolvedStudentInfo = resolveStudentInfo((res.data as OriginalStudentInfo));

        return resolvedStudentInfo;
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}