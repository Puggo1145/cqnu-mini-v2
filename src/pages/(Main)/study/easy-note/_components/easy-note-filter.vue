<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// components
import easyNoteCard from './easy-note-card.vue';
import cusSelect from '@/components/cus-select.vue';
import loading from '@/components/loading.vue';
import requireSchedule from './require-schedule.vue';
import noNote from '@/pages/(Main)/today/_components/no-note.vue';
import cusError from '@/components/cus-error.vue';
// store
import { useEasyNoteStore } from '@/stores/easy-note/easy-note';
import { useSchedule } from '@/stores/useSchedule';


const easyNoteStore = useEasyNoteStore();
const scheduleStore = useSchedule();

const current = ref(1);
const pageSize = ref(5);

async function fetchNotes() {
    const transformedCourseName = allRelatedCoursesOptions[selectedRelatedCourse.value] === "全部课程" 
    ? ""
    : allRelatedCoursesOptions[selectedRelatedCourse.value];

    const transformedTagName = tagsOptions[selectedTag.value] === "全部标签"
    ? ""
    : tagsOptions[selectedTag.value];

    await easyNoteStore.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        timespan: timeRangeOptions[selectedTimeRange.value],
        courseName: transformedCourseName,
        tagName: transformedTagName,
    });
}


const allRelatedCoursesOptions = ["全部课程", ...scheduleStore.getNamesOfLessons()];
const timeRangeOptions = [
    "今日内",
    "本周内",
    "两周内",
    "本月内",
    "季度内",
    "半年内",
    "今年内",
];
const tagsOptions = [
    "全部标签",
    "重要",
    "作业",
    "考试"
]
// 选中 option 的对应 index
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


onMounted(async () => {
    if (scheduleStore.lessons.length === 0) return;
    await fetchNotes();
});
watch(
    [
        selectedTimeRange, 
        selectedRelatedCourse, 
        selectedTag, 
        () => scheduleStore.lessons
    ], 
    async () => await fetchNotes()
);

// 刷新相关
let triggered = ref<boolean>(false);
// 下拉刷新
const handleScrollRefresh = async () => {
    current.value = 1;
    triggered.value = true;
    await fetchNotes();
    setTimeout(function(){
        triggered.value = false;
    },2000);
}
// 底部加载更多(节流) 只触发第一次
let timerId: ReturnType<typeof setTimeout> | null = null;
const handleScrollToLower = () => {
    if (timerId) {
        return;
    }
    timerId = setTimeout(async () => {
        current.value += 1;
        await fetchNotes();
        timerId = null;
    }, 2000);
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
            style="height:100%;" 
            refresher-enabled
            refresher-threshold="100" 
            refresher-default-style="black" 
            refresher-background="#FBF9F8" 
            :refresher-triggered="triggered"
            @refresherrefresh="handleScrollRefresh"
            @scrolltolower="handleScrollToLower"
        >
            <view class="flex flex-col gap-y-3">
                <require-schedule 
                    v-if="scheduleStore.lessons.length === 0"
                    class="mt-4"
                />
                <loading 
                    v-else-if="easyNoteStore.notes === undefined && !easyNoteStore.error"
                    class="mt-4"
                />
                <no-note 
                    v-else-if="easyNoteStore.notes && easyNoteStore.notes.length === 0"
                    class="mt-4"
                />
                <cus-error 
                    v-else-if="easyNoteStore.error"
                    class="mt-4"
                />

                <easy-note-card
                    v-else
                    v-for="note in easyNoteStore.notes"
                    :key="note.id"
                    :card="note"
                />
            </view>
            <!-- 占位 -->
            <view class="h-4"></view>
        </scroll-view>
    </view>
</template>
