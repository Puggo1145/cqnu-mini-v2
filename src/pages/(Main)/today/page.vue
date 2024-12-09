<script setup lang="ts">
import { onShareAppMessage } from '@dcloudio/uni-app';
// components
import cusPage from '@/components/cus-page.vue';
import dynamicHeader from './_components/dynamic-header.vue';
import announcement from './_components/announcement.vue';
import smartClass from './_components/smart-class.vue';
import todayTabs from './_components/today-tabs.vue';
import initialPopup from './_components/initial-popup.vue';
// hooks
import { useCourses } from '@/hooks/useCourses';


onShareAppMessage(() => ({
    title: "智慧重师",
    path: "/pages/(Main)/today/page",
}))


const {
    courseOfToday,
    remainingTimeOfLatestCourse,
} = useCourses();
</script>

<template>
    <cus-page>
        <view class="px-4">
            <dynamic-header />
            <announcement />
        </view>

        <scroll-view
            class="overflow-hidden flex-1 flex flex-col"
            scroll-y
        >
            <!-- 课程信息 -->
            <view class="px-4">
                <smart-class
                    :course-of-today="courseOfToday"
                    :remaining-time-of-latest-course="remainingTimeOfLatestCourse"
                />
            </view>

            <!-- Tab 区域 -->
            <today-tabs class="flex-1"/>
        </scroll-view>
    </cus-page>

    <initial-popup />
</template>