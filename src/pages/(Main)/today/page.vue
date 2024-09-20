<script setup lang="ts">
import { onShareAppMessage } from '@dcloudio/uni-app';
// components
import cusPage from '@/components/cus-page.vue';
import dynamicHeader from './_components/dynamic-header.vue';
import announcement from './_components/announcement.vue';
// import tabs from './_components/tabs.vue';
import smartClass from './_components/smart-class.vue';
import classEasyNote from './_components/class-easy-note.vue';
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
            <!-- <tabs /> -->
        </view>
        <view class="overflow-hidden px-4 flex-1 flex flex-col">
            <smart-class
                :course-of-today="courseOfToday"
                :remaining-time-of-latest-course="remainingTimeOfLatestCourse"
            />
            <view class="overflow-hidden flex-1">
                <class-easy-note />
            </view>
        </view>
    </cus-page>

    <initial-popup />
</template>