import { getJwxtCookie } from "./get-jwxt-cookie";
import { getYearAndTerm } from "./scheduleHandlers";
import urls from "../../constants/urls";
import { resolveSchedule } from "./scheduleHandlers";

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