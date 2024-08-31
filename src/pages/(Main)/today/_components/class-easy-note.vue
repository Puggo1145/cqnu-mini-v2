<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// components
import classEasyNoteHeader from './class-easy-note-header.vue';
import notes from '../../study/easy-note/_components/notes.vue';
// hooks
import { useCourses } from '@/hooks/useCourses';
// store
import { useClassEasyNoteStore } from '@/stores/easy-note/class-easy-note';
import { useSchedule } from '@/stores/useSchedule';


const { currentCourseName } = useCourses();
const scheduleStore = useSchedule();
const classEasyNoteStore = useClassEasyNoteStore();

const current = ref(1);
const pageSize = ref(5);

onMounted(async () => {
    // 今日无课，显示今天的小记
    if (scheduleStore.lessons.length === 0) return;

    await classEasyNoteStore.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        courseName: currentCourseName.value || "",
        tagName: "",
        timespan: "今日内",
    });
})


watch(() => currentCourseName.value, newVal => {
    current.value = 1;

    classEasyNoteStore.currentCourse = newVal;
    classEasyNoteStore.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        courseName: newVal || "",
        tagName: "",
        timespan: "今日内",
    });
})
watch(() => scheduleStore.lessons, () => {
    current.value = 1;

    classEasyNoteStore.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        courseName: classEasyNoteStore.currentCourse || "",
        tagName: "",
        timespan: "今日内",
    });
})
</script>

<template>
    <view class="mt-8">
        <class-easy-note-header 
            :noCourseOfToday="!currentCourseName && scheduleStore.lessons.length !== 0" 
        />

        <view class="pt-3">
            <notes
                :noSchedule="scheduleStore.lessons.length === 0"
                :notes="classEasyNoteStore.notes"
                :error="classEasyNoteStore.error"
            />
        </view>
    </view>
</template>
