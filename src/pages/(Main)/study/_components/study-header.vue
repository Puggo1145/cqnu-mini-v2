<script setup lang="ts">
// static
import images from '@/constants/images';
</script>

<template>
    <image
        :src="images.study.bg"
        class="z-0 fixed w-[255px] -right-4 top-2"
    />
    <view class="mt-9 w-full h-[80px]">
        <text class="font-bold text-3xl text-modern">学业中心</text>
    </view>
</template>
