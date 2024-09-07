import { getJwxtCookie } from "./get-jwxt-cookie";
import { getYearAndTerm } from "../../utils/scheduleHandlers";
import urls from "../../constants/urls";
import { resolveSchedule } from "../../utils/scheduleHandlers";

export const getSchedules = async () => {
    try {
        const jwxtCookie = await getJwxtCookie();
        if (!jwxtCookie) return false;

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

        if (res.statusCode !== 200) {
            uni.showToast({
                title: "网络错误",
                icon: "error",
            })

            return false;
        }

        const resolvedSchedule = resolveSchedule((res.data as any).kbList);
        // 缓存课表
        uni.setStorageSync("schedule", resolvedSchedule);

        return resolvedSchedule;
    } catch {
        uni.showToast({
            title: "网络错误",
            icon: "error",
        })

        return false;
    }
}