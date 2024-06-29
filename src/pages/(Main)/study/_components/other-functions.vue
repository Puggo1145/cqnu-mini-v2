<script setup lang="ts">
// assets
import icons from '@/constants/icons';

const otherFunctions = [
    {
        name: "成绩查询",
        icon: icons.study.transcript,
    },
    {
        name: "我的课表",
        icon: icons.study.schedule,
    },
    {
        name: "复习资料",
        icon: icons.study.review,
    },
];
</script>

<template>
    <view class="w-full h-[124px] rounded-2xl bg-white flex items-center justify-evenly">
        <view 
            v-for="func in otherFunctions"
            :key="func.name"
            class="flex flex-col items-center gap-1"
        >
            <image :src="func.icon" class="size-12" />
            <text class="text-sm text-secondary-foreground">{{ func.name }}</text>
        </view>
    </view>
</template>
