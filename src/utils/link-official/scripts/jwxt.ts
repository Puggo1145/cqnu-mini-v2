// libs
import { getJwxtCookie } from "../libs/jwxt/get-jwxt-cookie";
import {
    getYearAndTerm,
    resolveSchedule
} from "../libs/jwxt/scheduleHandlers";
import { resolveStudentInfo } from "../libs/jwxt/studentInfoHandler";
// utils
import { parseOverallGrade } from "../utils/htmlparser";
// constants
import urls from "../constants/urls";

export const getSchedules = async () => {
    try {
        const jwxtCookie = await getJwxtCookie();

        // 获取当前学年和学期
        const scheduleFormData = getYearAndTerm();

        const res = await uni.request({
            method: "POST",
            url: urls.schedule,
            data: scheduleFormData,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded',
                "Cookie": jwxtCookie
            }
        })

        return resolveSchedule((res.data as any).kbList);
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}

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
    } []
}
export const getTermGrade = async (
    xnm: number, // 学年
    xqm: number // 学期
) => {
    try {
        const jwxtCookie = await getJwxtCookie();

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
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}
