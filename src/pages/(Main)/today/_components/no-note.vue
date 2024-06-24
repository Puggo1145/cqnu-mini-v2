<script setup lang="ts">
// components
import cusButton from '@/components/cus-button.vue';
import images from '@/constants/images';
</script>

<template>
    <view class="w-full flex flex-col items-center mt-4">
        <image :src="images.addNote" class="w-[172px] h-[100px]" />
        <view class="flex flex-col items-center mt-4 gap-y-1">
            <text class="font-bold text-md text-secondary-foreground">暂无小记</text>
            <text class="text-sm text-secondary-foreground">快和同学分享这节课要记下来的事情吧！</text>
        </view>
        <cusButton class="mt-4 w-full" variant="secondary">
            创建小记
        </cusButton>
        <view class="h-4"></view>
    </view>
</template>
