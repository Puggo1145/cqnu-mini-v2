<script setup lang="ts">
// components
import spinner from './spinner.vue';
</script>

<template>
    <view class="w-full flex flex-col items-center justify-center gap-y-2">
        <spinner size="medium" />
        <text class="text-secondary-foreground text-sm">加载中</text>
    </view>
</template>
