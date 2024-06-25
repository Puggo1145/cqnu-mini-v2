<script setup lang="ts">
import { ref } from 'vue';
// components
import easyNoteCard from './easy-note-card.vue';
import cusSelect from '@/components/cus-select.vue';
// mock
import { allRelatedCourses } from '@/mock/easy-note';
import { mockNotes } from '@/mock/easy-note';

// select ranges
const timeRangeOptions = [
    "今日内",
    "本周内",
    "两周内",
    "本月内",
    "季度内",
    "半年内",
    "今年内",
];
const allRelatedCoursesOptions = ref(allRelatedCourses);
const tagsOptions = ref([
    "重要",
    "作业",
    "考试"
])
// select values
const selectedTimeRange = ref(0);   
const selectedRelatedCourse = ref(0);
const selectedTag = ref(0);

function onTimeRangeChange(e: any) {
    selectedTimeRange.value = e.value;
}
function onRelatedCourseChange(e: any) {
    selectedRelatedCourse.value = e.value;
}
function onTagChange(e: any) {
    selectedTag.value = e.value;
}
</script>

<template>
    <view class="h-full flex flex-col">
        <!-- filters -->
        <view class="flex items-center gap-x-3">
            <cus-select
                :value="selectedTimeRange"
                :range="timeRangeOptions"
                @change="onTimeRangeChange"
                variant="mini"
            />
            <cus-select
                :value="selectedRelatedCourse"
                :range="allRelatedCoursesOptions"
                @change="onRelatedCourseChange"
                variant="mini"
            />
            <cus-select
                :value="selectedTag"
                :range="tagsOptions"
                @change="onTagChange"
                variant="mini"
            />
        </view>
        <!-- cards -->
        <scroll-view
            class="mt-4 overflow-hidden flex-1"
            scroll-y
        >
            <view class="flex flex-col gap-y-3">
                <easy-note-card 
                    v-for="note in mockNotes"
                    :key="note.id"
                    v-bind="note"
                />
                <easy-note-card 
                    v-for="note in mockNotes"
                    :key="note.id"
                    v-bind="note"
                />
            </view>
            <!-- 占位 -->
            <view class="h-4"></view>
        </scroll-view>
    </view>
</template>
