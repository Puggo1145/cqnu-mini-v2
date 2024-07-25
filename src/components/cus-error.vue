<script setup lang="ts">
// static
import images from '@/constants/images';
</script>

<template>
    <view class="w-full flex flex-col items-center">
        <view class="flex flex-col items-center mt-4 gap-y-1">
            <text class="font-bold text-2xl text-secondary-foreground">网络错误</text>
            <text class="text-sm text-secondary-foreground">请检查您的网络连接</text>
        </view>
        <image 
            :src="images.networkError" 
            class="z-0 fixed -right-[64px] -bottom-[90px] w-[280px]"
        />
        <view class="h-4"></view>
    </view>
</template>
