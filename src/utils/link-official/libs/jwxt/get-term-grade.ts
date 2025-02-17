import { getJwxtCookie } from "./get-jwxt-cookie"
import urls from "../../constants/urls"

export interface OriginalTermGrade {
    currentPage: number
    currentResult: number
    items: {
        bfzcj: string // 本学期成绩
        jd: string // 绩点
        kcmc: string // 课程名称
        kcxzmc: string // 课程性质
        ksxz: string // 成绩性质
        xf: string // 学分
    }[]
}
export const getTermGrade = async (
    xnm: number, // 学年
    xqm: number // 学期
) => {
    try {
        const jwxtCookie = await getJwxtCookie();
        if (!jwxtCookie) return null

        // 返回的是 html 文档
        const res = await uni.request({
            method: "POST",
            url: urls.termGrade,
            data: {
                xnm,
                xqm,
                "queryModel.showCount": 50
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                "Cookie": jwxtCookie
            }
        })

        return res.data as OriginalTermGrade;
    } catch {
        uni.showToast({
            title: "校园门户错误，请重试!",
            icon: "none",
            duration: 1200
        })

        return null;
    }
}
