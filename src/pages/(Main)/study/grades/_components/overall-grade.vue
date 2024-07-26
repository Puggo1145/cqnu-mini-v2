<script setup lang="ts">
import { ref } from 'vue';


interface CourseDetail {
    name: string;
    count: number;
}
const gpa = ref(3.73);
const courseDetails = ref<CourseDetail[]>([
    { name: "未通过", count: 0 },
    { name: "未修", count: 3 },
    { name: "在读", count: 8 },
    { name: "通过", count: 46 },
])
</script>

<template>
    <view class="w-full p-4 rounded-2xl bg-primary flex flex-col gap-y-1">
        <text class="text-primary-foreground text-sm font-bold">
            平均学分绩点（GPA）
        </text>
        <view>
            <text class="text-primary-foreground font-bold text-3xl">
                {{ gpa }}
            </text>
            <text class="text-primary-foreground font-bold text-sm">
                / 5
            </text>
        </view>
    </view>
    <view class="mt-3 w-full p-4 bg-secondary rounded-2xl flex justify-evenly">
        <view
            v-for="courseDetail in courseDetails"
            class="w-12 flex flex-col items-center"
        >
            <text class="font-bold">
                {{ courseDetail.count }}
            </text>
            <text class="text-sm text-secondary-foreground">
                {{ courseDetail.name }}
            </text>
        </view>
    </view>
</template>
