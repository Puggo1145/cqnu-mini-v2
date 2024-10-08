<script setup lang="ts">
import { computed } from 'vue';

interface CourseDetails {
    name: string; // 课程名称
    nature: string; // 课程性质
    type: string; // 课程类别
    status: string; // 课程状态
    credit: string; // 学分
    score?: string; // 成绩
    GPA?: string; // 绩点
}
const { title, courseDetails } = defineProps<{
    title: string;
    courseDetails: CourseDetails[]
}>();


const totalCredit = computed(() => {
    return courseDetails.reduce((acc, cur) => {
        return acc + Number(cur.credit);
    }, 0);
});
const passedCredit = computed(() => {
    return courseDetails.reduce((acc, cur) => {
        return cur.status === "已修" ? acc + Number(cur.credit) : acc;
    }, 0);
});
</script>

<template>
    <view class="w-full rounded-2xl flex flex-col mb-6">
        <view class="ml-2 w-full flex items-end justify-between">
            <text class="font-bold text-2xl">
                {{ title }}
            </text>
            <view class="mr-4">
                <text class="text-sm text-secondary-foreground mr-3">
                    已修学分: {{ passedCredit }}
                </text>
                <text class="text-sm text-secondary-foreground">
                    总学分: {{ totalCredit }}
                </text>
            </view>
        </view>
        <scroll-view
            scroll-y
            class="mt-2 py-4 overflow-hidden w-full h-[400px] bg-secondary rounded-2xl"
        >
            <view
                v-for="course in courseDetails"
                :key="course.name"
                class="flex justify-between items-center px-4 pb-4 last:pb-0"
            >
                <!-- 基本信息 -->
                <view class="flex flex-col flex-1 gap-x-6">
                    <text class="text-sm line-clamp-1">
                        {{ course.name }}
                    </text>
                    <view class="flex items-center gap-x-2 text-xs text-secondary-foreground">
                        <text>
                            {{ course.nature }}
                        </text>
                        <text>
                            {{ course.type }}
                        </text>
                        <text>
                            {{ course.credit }} 学分
                        </text>
                    </view>
                </view>
                <!-- 成绩与状态 -->
                <view class="flex items-center gap-x-4">
                    <text 
                        v-if="course.score && course.GPA"
                        class="font-bold"
                    >
                        {{ course.score }} / {{ course.GPA }}
                    </text>
                    <text class="text-sm">
                        {{ course.status }}
                    </text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
