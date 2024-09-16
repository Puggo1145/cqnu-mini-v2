<script setup lang="ts">
const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <view class="mb-8 flex flex-col gap-y-2">
        <text class="ml-2 text-md font-bold">{{ title }}</text>
        <slot></slot>
    </view>
</template>