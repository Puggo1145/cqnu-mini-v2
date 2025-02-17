import { getJwxtCookie } from "./get-jwxt-cookie"
import urls from "../../constants/urls"
import { resolveStudentInfo } from "../../utils/studentInfoHandler"


// 研究生和本科生教务系统是独立的，默认使用本科生系统进行尝试

export interface OriginalStudentInfo {
    xh: string // 学号
    pyccdm: string // 学生身份（本科 | 专升本 ｜ 研究生）
    jg_id: string // 学院
    bh_id: string // 专业班级
    zyh_id: string // 专业
}
export const getStudentInfo = async () => {
    try {
        const jwxtCookie = await getJwxtCookie();
        if (!jwxtCookie) return null

        const res = await uni.request({
            method: "GET",
            url: urls.studentInfo,
            header: {
                "Cookie": jwxtCookie
            }
        });

        const resolvedStudentInfo = resolveStudentInfo((res.data as OriginalStudentInfo));

        return resolvedStudentInfo;
    } catch (err) {
        uni.showToast({
            title: (err as Error).message || "校园门户错误，请重试",
            icon: "none",
            duration: 1200
        })

        return null;
    }
}