<script setup lang="ts">
// 页面标题和描述信息组件
interface Props {
    title: string;
    desc: string;
}
const { title, desc } = defineProps<Props>();
</script>

<template>
    <view class="flex flex-col">
        <text class="font-bold text-[32px]">
            {{ title }}
        </text>
        <text class="text-md">
            {{ desc }}
        </text>
    </view>
</template>