<script setup lang="ts">
// static
import icons from '@/constants/icons';


function goBack() {
    uni.navigateBack();
}
</script>

<template>
    <view class="pl-4 w-full h-[60px] flex items-center justify-between">
        <image
            :src="icons.back"
            class="size-6"
            @click="goBack"
        />
    </view>
</template>
