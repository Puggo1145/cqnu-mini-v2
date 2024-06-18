<script setup lang="ts">
// 注册页面包含具体注册步骤标题和描述的 swiper-item 组件
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