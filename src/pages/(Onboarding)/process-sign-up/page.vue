<script setup lang="ts">
import { onMounted } from 'vue';
import cusPage from '@/components/cus-page.vue';
import spinner from '@/components/spinner.vue';
// api
import { validateTokenAndSyncUserInfo } from '@/api/user';

onMounted(async () => {
    const process = [];

    // 1. 同步用户信息
    const isSuccess = await validateTokenAndSyncUserInfo();
    if (isSuccess) {
        process.push("userInfo");
    };

    // 检查流程是否完成
    if (process.length === 1) {
        uni.switchTab({
            url: '/pages/(Main)/today/page'
        });
    };
});
</script>

<template>
    <cus-page>
        <view class="flex flex-col items-center gap-12 mt-[152px]">
            <text class="text-[96px]">🥳</text>
            <view class="flex flex-col items-center gap-3">
                <text class="text-4xl font-bold">大功告成！</text>
                <text class="text-sm text-gray-500">正在为你营造个性化体验，请稍候</text>
            </view>
            <view class="mt-[100px]">
                <spinner />
            </view>
        </view>
    </cus-page>
</template>
