<script setup lang="ts">
import images from '@/constants/images';
</script>

<template>
    <view class="flex flex-col items-center mt-4 gap-y-1">
        <text class="font-bold text-2xl text-secondary-foreground">暂无消费信息</text>
        <text class="text-sm text-secondary-foreground">切换其他时间看看吧</text>
    </view>
    <image
        :src="images.NoEasyNote"
        class="z-0 fixed right-0 -bottom-[30px] w-[220px] h-[180px]"
    />
    <view class="h-4"></view>
</template>
