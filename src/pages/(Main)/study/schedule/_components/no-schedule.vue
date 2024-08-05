<script setup lang="ts">
// components
import noData from '@/components/no-data.vue';
// store
import { useLinkOfficialAuth } from '@/stores/link-official-auth';
import { useSchedule } from '@/stores/useSchedule';
// api
import { getSchedules } from '@/utils/link-official';

const schedule = useSchedule();
const linkOfficialAuth = useLinkOfficialAuth();


async function updateSchedule() {
    if (!linkOfficialAuth.mainCookie) {
        uni.navigateTo({
            url: `/pages/(Main)/link-official/page`,
        });

        return;
    }

    uni.showLoading({ title: '正在同步' });

    const res = await getSchedules();
    if (res) {
        schedule.lessons = res;
    }

    uni.hideLoading();
}
</script>

<template>
    <view class="w-full h-full flex justify-center mt-[160px]">
        <no-data
			title="暂无课程"
			desc="点击右上角的同步按钮一键同步课程吧！"
            action-text="同步"
            :action="updateSchedule"
		/>
    </view>
</template>
