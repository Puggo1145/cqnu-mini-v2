// libs
import { getJwxtCookie } from "../libs/jwxt/getJwxtCookie";
import { 
    getYearAndTerm,
    resolveSchedule
} from "../libs/jwxt/scheduleHandlers";
import { resolveStudentInfo } from "../libs/jwxt/studentInfoHandler";
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
        console.log(res);
        

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