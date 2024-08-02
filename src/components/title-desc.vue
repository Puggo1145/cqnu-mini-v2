<script setup lang="ts">
import { computed, withDefaults } from 'vue';

// 页面标题和描述信息组件
interface Props {
    title: string;
    desc: string;
    titleSize?: "default" | "medium";
}
const { title, desc, titleSize } = withDefaults(defineProps<Props>(), {
    title: "请输入无标题",
    desc: "请输入描述",
    titleSize: "default",
});

const titleSizeVariants = computed(() => {
    return titleSize === "medium" ? "text-[24px]" : "text-[32px]";
});
</script>

<template>
    <view class="flex flex-col">
        <text :class="['font-bold', titleSizeVariants]">
            {{ title }}
        </text>
        <text class="text-sm text-secondary-foreground">
            {{ desc }}
        </text>
    </view>
</template>