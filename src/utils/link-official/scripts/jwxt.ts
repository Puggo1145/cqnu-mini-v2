// libs
import { getJwxtCookie } from "../libs/jwxt/getJwxtCookie";
import { 
    getYearAndTerm,
    resolveSchedule
} from "../libs/jwxt/scheduleHandlers";
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
        }) as any;

        return resolveSchedule(res.data.kbList);
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return null;
    }
}