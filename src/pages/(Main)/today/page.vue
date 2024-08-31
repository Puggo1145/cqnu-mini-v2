<script setup lang="ts">
import { computed } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import dynamicHeader from './_components/dynamic-header.vue';
// import tabs from './_components/tabs.vue';
import smartClass from './_components/smart-class.vue';
import classEasyNote from './_components/class-easy-note.vue';
import initialPopup from './_components/initial-popup.vue';
// hooks
import { useCourses } from '@/hooks/useCourses';


const { 
    courseOfToday,
    remainingTimeOfLatestCourse,
} = useCourses();
</script>

<template>
    <cus-page>
        <view class="px-4">
            <dynamic-header />
            <!-- <tabs /> -->
        </view>
        <scroll-view
            class="mt-4 flex-1 overflow-hidden"
            scroll-y
            enable-back-to-top
            :show-scrollbar="false"
        >
            <view class="px-4 pb-4">
                <smart-class
                    :course-of-today="courseOfToday"
                    :remaining-time-of-latest-course="remainingTimeOfLatestCourse"
                />
                <class-easy-note />
            </view>
        </scroll-view>
    </cus-page>

    <initial-popup />
</template>