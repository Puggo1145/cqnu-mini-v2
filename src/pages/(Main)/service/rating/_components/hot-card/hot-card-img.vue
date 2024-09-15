<script setup lang="ts">
const { img } = defineProps<{ img: string }>();
</script>

<template>
    <view class="overflow-hidden bg-secondary rounded-xl w-[140px] h-[100px]">
        <image
            class="w-full h-full"
            :src="img"
        />
    </view>
</template>
