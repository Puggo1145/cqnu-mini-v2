<script setup lang="ts">
// static
import icons from '@/constants/icons';


const otherFunctions = [
    {
        name: "成绩查询",
        icon: icons.study.transcript,
        url: "/pages/(Main)/study/grades/page"
    },
    {
        name: "我的课表",
        icon: icons.study.schedule,
        url: "/pages/(Main)/study/schedule/page"
    },
    {
        name: "学业情况",
        icon: icons.study.review,
        url: "/pages/(Main)/study/academic-details/page"
    },
];


function goToPage(url: string) {
    uni.navigateTo({ url })
}
</script>

<template>
    <view class="w-full h-[124px] rounded-2xl bg-secondary flex items-center justify-evenly">
        <view 
            v-for="func in otherFunctions"
            :key="func.name"
            class="flex flex-col items-center gap-1"
            @click="goToPage(func.url)"
        >
            <image :src="func.icon" class="size-12" />
            <text class="text-sm text-secondary-foreground">{{ func.name }}</text>
        </view>
    </view>
</template>
