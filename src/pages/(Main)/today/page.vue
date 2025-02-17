<script setup lang="ts">
import { onShareAppMessage } from '@dcloudio/uni-app';
// components
import cusPage from '@/components/cus-page.vue';
import dynamicHeader from './_components/dynamic-header.vue';
import smartClass from './_components/smart-class.vue';
import studyIndex from '@/pages/(Main)/study/study-index.vue';
import serviceIndex from '@/pages/(Main)/service/service-index.vue';
import initialPopup from './_components/initial-popup.vue';
// hooks
import { useCourses } from '@/hooks/useCourses';
// constants
import { VERSION } from '@/constants/about';

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
        <scroll-view
            class="overflow-hidden flex-1 flex flex-col"
            scroll-y
        >
            <view class="px-4">
                <dynamic-header />
            </view>
            <!-- 课程信息 -->
            <view class="px-4 flex flex-col gap-y-4">
                <smart-class
                    :course-of-today="courseOfToday"
                    :remaining-time-of-latest-course="remainingTimeOfLatestCourse"
                />
                <study-index />
                <service-index />
            </view>
        </scroll-view>
    </cus-page>
    <text class="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-secondary-foreground/20">
        智慧重师 v{{ VERSION }}
    </text>
    <initial-popup />
</template>