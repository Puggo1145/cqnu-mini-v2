<script setup lang="ts">
// assets
import images from '@/constants/images';
</script>

<template>
    <view class="flex justify-between gap-x-4">
        <view class="relative w-full h-[108px] px-4 py-5 bg-[#598af6] rounded-2xl">
            <view class="flex flex-col relative z-10">
                <text class="text-2xl font-bold text-white">学搭 Todo</text>
                <text class="text-xs text-white bg-opacity-90">发现学搭 共同进步</text>
            </view>
            <image :src="images.study.todo" class="absolute z-0 size-[92px] right-1 -bottom-2" />
        </view>
        <view class="relative w-full h-[108px] px-4 pt-5 bg-[#649ef3] rounded-2xl flex flex-col">
            <view class="flex flex-col relative z-10">
                <text class="text-2xl font-bold text-white">班级小记</text>
                <text class="text-xs text-white bg-opacity-90">整理学业重要事项</text>
            </view>
            <image :src="images.study.easyNote" class="absolute z-0 size-[92px] right-1 -bottom-2" />
        </view>
    </view>
</template>
