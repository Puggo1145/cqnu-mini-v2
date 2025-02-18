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
        schedule.setLessonsToStorage(res);
        uni.showToast({
            title: "同步成功",
            icon: "success",
            duration: 750
        })
    }
}
</script>

<template>
    <view class="w-full h-full flex justify-center mt-[160px]">
        <no-data
            :title="schedule.hasSynced ? '暂无课程' : '未同步课表'"
            :desc="schedule.hasSynced ? '本学期暂无课程安排' : '点击按钮一键同步课程吧！'"
            action-text="同步"
            :action="updateSchedule"
        />
    </view>
</template>
