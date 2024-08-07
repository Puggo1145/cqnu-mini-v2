<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import dynamicHeader from './_components/dynamic-header.vue';
// import tabs from './_components/tabs.vue';
import smartClass from './_components/smart-class.vue';
import classEasyNote from './_components/class-easy-note.vue';
// store
import { useSchedule } from '@/stores/useSchedule';
// constants
import { baseConfigs } from '@/constants/baseConfig';


const schedule = useSchedule();
const currentTime = ref(new Date()); // 每分钟更新一次时间，令视图基于时间响应

let timer: number;
onMounted(() => {
    timer = setInterval(() => {
        currentTime.value = new Date();
    }, 60000); // 每分钟重新计算一次剩余课程
});
onUnmounted(() => {
    clearInterval(timer);
});

const courseOfToday = computed(() => {
    // 未开学的不算
    if (new Date(baseConfigs.termStartDate) > currentTime.value) return [];

    const allCoursesOfToday = schedule.getLessons({
        week: schedule.getCurrentWeek(new Date(baseConfigs.termStartDate), baseConfigs.totalWeeks),
        day: currentTime.value.getDay(),
    })

    const remainingCourses = allCoursesOfToday.filter(course => {
        const startTime = baseConfigs.courseStartTime[course.start_time - 1].split(':');
        const courseTime = new Date(currentTime.value.getFullYear(), currentTime.value.getMonth(), currentTime.value.getDate(), Number(startTime[0]), Number(startTime[1]));

        return courseTime > currentTime.value;
    })

    return remainingCourses;
});

const currentCourseName = computed(() => {
    if (courseOfToday.value.length === 0) return null;

    return courseOfToday.value[0].name;
});

const remainingTimeOfLatestCourse = computed(() => {
    if (courseOfToday.value.length === 0) return 0;

    const startTime = baseConfigs.courseStartTime[courseOfToday.value[0].start_time - 1].split(':');
    const courseTime = new Date(currentTime.value.getFullYear(), currentTime.value.getMonth(), currentTime.value.getDate(), Number(startTime[0]), Number(startTime[1]));

    return Math.floor((courseTime.getTime() - currentTime.value.getTime()) / 1000 / 60);
});
</script>

<template>
    <cus-page>
        <view class="px-4">
            <dynamic-header />
            <!-- <tabs /> -->
        </view>
        <scroll-view 
            class="mt-4 flex-1 overflow-hidden"
            scroll-y
            enable-back-to-top
            :show-scrollbar="false"
        >
            <view class="px-4 pb-4">
                <smart-class
                    :course-of-today="courseOfToday"
                    :remaining-time-of-latest-course="remainingTimeOfLatestCourse"
                />
                <class-easy-note 
                    :current-course-name="currentCourseName"
                />
            </view>
        </scroll-view>
    </cus-page>
</template>