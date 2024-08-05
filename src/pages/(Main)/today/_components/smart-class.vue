<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
// store
import { useSchedule } from '@/stores/useSchedule';
// constants
import { baseConfigs } from '@/constants/baseConfig';

const courseStartTime = [
    "8 : 30",
    "9 : 25",
    "10 : 30",
    "11 : 25",
    "14 : 30",
    "15 : 25",
    "16 : 30",
    "17 : 25",
    "19 : 30",
    "20 : 25",
]

const schedule = useSchedule();
const currentTime = ref(new Date());

const courseOfToday = computed(() => {
    const allCoursesOfToday = schedule.getLessons({
        week: schedule.getCurrentWeek(new Date(baseConfigs.termStartDate), baseConfigs.totalWeeks),
        day: currentTime.value.getDay(),
    })

    const remainingCourses = allCoursesOfToday.filter(course => {
        const startTime = courseStartTime[course.start_time - 1].split(':');
        const courseTime = new Date(currentTime.value.getFullYear(), currentTime.value.getMonth(), currentTime.value.getDate(), Number(startTime[0]), Number(startTime[1]));

        return courseTime > currentTime.value;
    })

    return remainingCourses;
});

const remainingTimeOfLatestCourse = computed(() => {
    if (courseOfToday.value.length === 0) return 0;

    const startTime = courseStartTime[courseOfToday.value[0].start_time - 1].split(':');
    const courseTime = new Date(currentTime.value.getFullYear(), currentTime.value.getMonth(), currentTime.value.getDate(), Number(startTime[0]), Number(startTime[1]));

    return Math.floor((courseTime.getTime() - currentTime.value.getTime()) / 1000 / 60);
})

function goToSchedule() {
    uni.navigateTo({
        url: '/pages/(Main)/study/schedule/page'
    })
}


let timer: number;

onMounted(() => {
    timer = setInterval(() => {
        currentTime.value = new Date();
    }, 60000); // 每分钟重新计算一次剩余课程
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <!-- 最近一节课程 -->
    <view class="w-full">
        <view 
            class="w-full p-6 rounded-2xl text-white leading-none bg-[#5670FD] shadow-lg shadow-[#5670FD]/20"
            @click="goToSchedule"
        >
            <view 
                v-if="courseOfToday.length === 0"
            >
                <text class="text-white text-3xl">今日无课</text>
            </view>
            <view 
                v-else
                class="flex flex-col justify-between gap-y-2"
            >
                <view :class="remainingTimeOfLatestCourse <= 30 && 'w-fit bg-white rounded-full py-1 px-3 mb-1'">
                    <text
                        v-if="remainingTimeOfLatestCourse > 60"
                        class="text-sm"
                    >
                        距离上课还有 {{ Math.floor(remainingTimeOfLatestCourse / 60) }} 小时
                    </text>
                    <text
                        v-else-if="remainingTimeOfLatestCourse <= 60 && remainingTimeOfLatestCourse > 1"
                        class="text-sm"
                        :class="remainingTimeOfLatestCourse <= 30 && 'font-bold text-primary'"
                    >
                        距离上课还有 {{ remainingTimeOfLatestCourse }} 分钟
                    </text>
                    <text
                        v-else-if="remainingTimeOfLatestCourse <= 0"
                        class="text-sm"
                        :class="'font-bold text-primary'"
                    >
                        距离上课还有不到 1 分钟
                    </text>
                </view>
                <view class="w-full flex items-center justify-between">
                    <text class="text-3xl font-bold leading-none flex-1 line-clamp-1">
                        {{ courseOfToday[0].name }}
                    </text>
                    <text class="text-2xl font-bold leading-none w-[96px] text-right">
                        {{ courseStartTime[courseOfToday[0].start_time - 1] }}
                    </text>
                </view>
                <text class="text-sm font-bold">
                    {{ courseOfToday[0].place }}
                </text>
            </view>
        </view>
    </view>
    <!-- 今日课程列表 -->
    <scroll-view
        scroll-x
        class="mt-3 w-full whitespace-nowrap"
    >
        <view
            v-if="courseOfToday.length <= 1"
            class="w-full p-5 flex items-center justify-center bg-secondary rounded-2xl text-secondary-foreground"
        >
            <text class="text-md font-bold whitespace-nowrap">
                今日已无更多课程
            </text>
        </view>
        <view
            v-else
            v-for="item in courseOfToday.slice(1)"
            :key="item.name"
            class="mr-3 p-5 pr-8 inline-flex flex-col gap-1 bg-secondary rounded-2xl text-secondary-foreground"
        >
            <text class="text-md font-bold whitespace-nowrap">
                {{ item.name }}
            </text>
            <text class="text-sm">
                {{ courseStartTime[item.start_time] }}
            </text>
        </view>
    </scroll-view>
</template>
