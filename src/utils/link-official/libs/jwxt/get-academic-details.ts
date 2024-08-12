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
            }
        })

        return resolveAcademicDetails(res.data as OriginalAcademicDetails[]);
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}

interface OriginalAcademicDetails {
    KCMC: string; // 课程名称
    KCXZMC: string; // 课程性质名称
    KCLBMC: string; // 课程类别名称
    XDZT: "1" | "3" | "4"; // 修读状态 (1: 在修, 3: 未修, 4: 已修)
    XF: string; // 学分
    CJ?: string; // 成绩
    JD?: string; // 绩点
}
interface resolvedAcademicDetails {
    name: string; // 课程名称
    nature: string; // 课程性质
    type: string; // 课程类别
    status: string; // 课程状态
    credit: string; // 学分
    score?: string; // 成绩
    GPA?: string; // 绩点
}
const resolveAcademicDetails = (data: OriginalAcademicDetails[]): resolvedAcademicDetails[] => {
    const statusMap = {
        "1": "在修",
        "3": "未修",
        "4": "已修",
    }
    
    return data.map(detail => ({
        name: detail.KCMC,
        nature: detail.KCXZMC,
        type: detail.KCLBMC,
        status: statusMap[detail.XDZT],
        credit: detail.XF,
        score: detail.CJ,
        GPA: detail.JD,
    }))
}