<script setup lang="ts">
// static
import icons from '@/constants/icons';


const otherFunctions = [
    {
        name: "成绩查询",
        icon: icons.study.transcript,
        url: "/pages/(Main)/study/grades/page",
        availability: true
    },
    {
        name: "学业情况",
        icon: icons.study.review,
        url: "/pages/(Main)/study/academic-details/page",
        availability: true
    },
    {
        name: "场地预约",
        icon: icons.study.schedule,
        url: "/pages/(Main)/study/schedule/page",
        availability: false
    },
];


function goToPage(url: string, availability: boolean) {
    if (!availability) {
        uni.showToast({
            title: "开发中，敬请期待",
            icon: "none",
            duration: 1000
        })

        return
    }

    uni.navigateTo({ url })
}
</script>

<template>
    <view class="w-full h-[124px] rounded-2xl bg-secondary flex items-center justify-evenly">
        <view 
            v-for="func in otherFunctions"
            :key="func.name"
            class="flex flex-col items-center gap-1"
            @click="goToPage(func.url, func.availability)"
        >
            <image :src="func.icon" class="size-12" />
            <text class="text-sm text-secondary-foreground">{{ func.name }}</text>
        </view>
    </view>
</template>
