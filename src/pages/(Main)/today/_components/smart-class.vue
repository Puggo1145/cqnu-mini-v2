<script setup lang="ts">
// constants
import { baseConfigs } from '@/constants/baseConfig';
// store
import { useSchedule } from '@/stores/useSchedule';
// types
import type { Lesson } from '@/stores/useSchedule';


interface SmartClassProps {
    courseOfToday: Lesson[];
    remainingTimeOfLatestCourse: number;
}
const props = defineProps<SmartClassProps>();


const scheduleStore = useSchedule();


function goToSchedule() {
    uni.navigateTo({
        url: '/pages/(Main)/study/schedule/page'
    })
}
</script>

<template>
    <!-- 最近一节课程 -->
    <view class="w-full">
        <view
            class="w-full p-6 rounded-2xl text-white leading-none bg-[#5670FD] shadow-lg shadow-[#5670FD]/20"
            @click="goToSchedule"
        >
            <view
                v-if="scheduleStore.lessons.length === 0"
                class="flex flex-col gap-y-2"
            >
                <text class="text-white text-3xl font-bold">
                    请同步课表
                </text>
                <text class="text-sm text-white">
                    点击同步课表，让你的效率加倍！
                </text>
            </view>

            <view
                v-else-if="props.courseOfToday.length === 0"
                class="flex flex-col gap-y-2"
            >
                <text class="text-white text-3xl font-bold">
                    今日无课
                </text>
                <text class="text-sm text-white">
                    学习辛苦，好好休息一下吧
                </text>
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
                        {{ props.courseOfToday[0].name }}
                    </text>
                    <text class="text-2xl font-bold leading-none w-[96px] text-right">
                        {{ baseConfigs.courseStartTime[props.courseOfToday[0].start_time - 1] }}
                    </text>
                </view>
                <text class="text-sm font-bold">
                    {{ props.courseOfToday[0].place }}
                </text>
            </view>
        </view>
    </view>
    <!-- 今日课程列表 -->
    <scroll-view
        v-if="props.courseOfToday.length > 1"
        scroll-x
        class="mt-3 w-full whitespace-nowrap"
    >
        <view
            v-for="item in props.courseOfToday.slice(1)"
            :key="item.name"
            class="mr-3 p-5 pr-8 inline-flex flex-col gap-1 bg-secondary rounded-2xl text-secondary-foreground"
        >
            <text class="text-md font-bold whitespace-nowrap">
                {{ item.name }}
            </text>
            <text class="text-sm">
                {{ baseConfigs.courseStartTime[item.start_time] }}
            </text>
        </view>
    </scroll-view>
</template>
