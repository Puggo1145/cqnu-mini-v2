<script setup lang="ts">
import { ref, onMounted } from 'vue';
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';
import spinner from '@/components/spinner.vue';
// api
import { validateTokenAndSyncUserInfo } from '@/api/user';
import { getSchedules } from '@/utils/link-official';


const currentProcess = ref<string>();
const isProcessing = ref(false);
const isGetUserInfoError = ref(false);

const goProcess = async () => {
    isProcessing.value = true;
    isGetUserInfoError.value = false;

    // 1. 同步用户信息
    currentProcess.value = "正在同步用户信息";

    const isGetUserInfoSuccess = await validateTokenAndSyncUserInfo();
    if (isGetUserInfoSuccess) {
        currentProcess.value = "正在同步课表";
    } else {
        currentProcess.value = "获取用户信息失败，请重试";
        isGetUserInfoError.value = true;

        return;
    }


    // 2. 同步课表，错误则跳过
    await getSchedules();


    // 3. 流程完成，跳转到首页
    currentProcess.value = "准备完毕，欢迎来到智慧重师！";
    isProcessing.value = false;

    setTimeout(() => {
        uni.switchTab({
            url: '/pages/(Main)/today/page'
        });
    }, 1500);
}


onMounted(async () => {
    await goProcess();
});
</script>

<template>
    <cus-page>
        <view class="flex flex-col items-center gap-12 mt-[152px]">
            <text class="text-[96px]">🥳</text>
            <view class="flex flex-col items-center gap-3">
                <text class="text-4xl font-bold">大功告成！</text>
                <text class="text-sm text-gray-500">
                    {{ currentProcess }}
                </text>
            </view>
            <cus-button
                v-if="isGetUserInfoError"
                @click="goProcess"
                class="mt-[100px]"
            >
                重试
            </cus-button>
            <view
                v-else-if="isProcessing"
                class="mt-[100px]"
            >
                <spinner />
            </view>
        </view>
    </cus-page>
</template>