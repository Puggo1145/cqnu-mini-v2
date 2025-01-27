<script setup lang="ts">
// static
import icons from '@/constants/icons';

const studyFeatures = [
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
    {
        name: "梦厅预约",
        icon: icons.study.reservation,
        url: "/pages/(Main)/study/reservation/page"
    },
];

function goToPage(url: string) {
    uni.navigateTo({ url })
}
</script>

<template>
    <view class="p-6 w-full rounded-2xl bg-white grid grid-cols-3 grid-flow-row gap-y-3">
        <view
            v-for="feature in studyFeatures"
            :key="feature.name"
            class="flex flex-col items-center gap-1"
            @click="goToPage(feature.url)"
        >
            <image
                :src="feature.icon"
                class="size-12"
            />
            <text class="text-sm text-secondary-foreground">{{ feature.name }}</text>
        </view>
    </view>
</template>
