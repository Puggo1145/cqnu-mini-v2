<script setup lang="ts">
// components
import cusButton from '@/components/cus-button.vue';


function goToSyncSchedule() {
    uni.navigateTo({
        url: '/pages/(Main)/study/schedule/page',
    });
}
</script>

<template>
    <view class="w-full flex flex-col items-center">
        <text class="text-2xl text-secondary-foreground font-bold">
            请同步课表
        </text>
        <text class="text-sm text-secondary-foreground">
            小记同步您的需要课程信息以保证正常使用
        </text>
        <cus-button
            variant="secondary"
            class="mt-2 w-fit"
            @click="goToSyncSchedule"
        >
            去同步
        </cus-button>
    </view>
</template>