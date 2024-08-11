<script setup lang="ts">
import { ref, onMounted } from 'vue';
import cusPage from '@/components/cus-page.vue';
import spinner from '@/components/spinner.vue';
// api
import { validateTokenAndSyncUserInfo } from '@/api/user';
import { getSchedules } from '@/utils/link-official';


const process = ref<string[]>(["正在同步用户信息"]);

onMounted(async () => {
    // 1. 同步用户信息
    const isSuccess = await validateTokenAndSyncUserInfo();
    if (isSuccess) process.value = [...process.value, "正在同步课表"];

    // 2. 同步课表
    const schedule = await getSchedules();
    if (schedule) process.value = [...process.value, "欢迎来到智慧重师"];

    // 检查流程是否完成
    if (process.value.length === 3) {
        setTimeout(() => {
            uni.switchTab({
                url: '/pages/(Main)/today/page'
            });
        }, 1500);
    };
});
</script>

<template>
    <cus-page>
        <view class="flex flex-col items-center gap-12 mt-[152px]">
            <text class="text-[96px]">🥳</text>
            <view class="flex flex-col items-center gap-3">
                <text class="text-4xl font-bold">大功告成！</text>
                <text class="text-sm text-gray-500">
                    {{ process[process.length - 1] }}
                </text>
            </view>
            <view class="mt-[100px]">
                <spinner />
            </view>
        </view>
    </cus-page>
</template>
