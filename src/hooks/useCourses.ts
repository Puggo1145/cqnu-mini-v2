import {
    ref,
    onMounted,
    onUnmounted,
    computed
} from "vue"
// store
import { useSchedule } from "@/stores/useSchedule";
// constants
import { baseConfigs } from "@/constants/baseConfig";



// 使用模块级 state，每一次被调用都共享同一个 timer 实例
const currentTime = ref(new Date()); // 每分钟更新一次时间，令视图基于时间响应

let timer: number | null = null;

// 设置 timer，只在模块加载时执行一次
const startTimer = () => {
    if (timer !== null) return; // 如果 timer 已存在，不重复创建
    timer = setInterval(() => {
        currentTime.value = new Date();
    }, 60000); // 每分钟重新计算一次剩余课程
};

// 清除 timer
const clearTimer = () => {
    if (timer !== null) {
        clearInterval(timer);
        timer = null; // 确保 timer 被清除后重置为 null
    }
};

startTimer();


export const useCourses = () => {
    const schedule = useSchedule();

    // 在组件挂载时，启动 timer
    onMounted(() => {
        startTimer(); // 确保定时器运行
    });

    // 在组件卸载时，清除 timer
    onUnmounted(() => {
        clearTimer();
    });

    const courseOfToday = computed(() => {
        // 未开学的不算
        if (new Date(baseConfigs.termStartDate) > currentTime.value) return [];

        const allCoursesOfToday = schedule.getLessons({
            week: schedule.getCurrentWeek(new Date(baseConfigs.termStartDate), baseConfigs.totalWeeks),
            day: currentTime.value.getDay(),
        })

        const remainingCourses = allCoursesOfToday.filter(course => {
            const endTime = baseConfigs.courseStartTime[course.end_time - 1].split(':');
            const courseTime = new Date(currentTime.value.getFullYear(), currentTime.value.getMonth(), currentTime.value.getDate(), Number(endTime[0]), Number(endTime[1]));
            return courseTime > currentTime.value;
        })
        // console.log("remainingCourses", remainingCourses);
        return remainingCourses;
    });

    const currentCourseName = computed(() => {
        if (courseOfToday.value.length === 0) return null;
        // console.log("currentCourseName", courseOfToday.value[0].name);
        return courseOfToday.value[0].name;
    });

    const remainingTimeOfLatestCourse = computed(() => {
        if (courseOfToday.value.length === 0) return 0;

        const startTime = baseConfigs.courseStartTime[courseOfToday.value[0].start_time - 1].split(':');
        const courseTime = new Date(currentTime.value.getFullYear(), currentTime.value.getMonth(), currentTime.value.getDate(), Number(startTime[0]), Number(startTime[1]));

        return Math.floor((courseTime.getTime() - currentTime.value.getTime()) / 1000 / 60);
    });

    const indexOfCurrentCourse = computed(() => {
        return schedule.lessons.findIndex(course => course.name === currentCourseName.value);
    });


    return {
        currentTime,
        courseOfToday,
        currentCourseName,
        remainingTimeOfLatestCourse,
        indexOfCurrentCourse
    };
}
