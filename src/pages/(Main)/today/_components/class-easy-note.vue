<script setup lang="ts">
import { onMounted } from 'vue';
// components
import classEasyNoteHeader from './class-easy-note-header.vue';
import notes from '../../study/easy-note/_components/notes.vue';
// hooks
import { useCourses } from '@/hooks/useCourses';
import useFetchClassEasyNote from '@/hooks/useFetchClassEasyNote';
// store
import { useSchedule } from '@/stores/useSchedule';


const { currentCourseName } = useCourses();
const scheduleStore = useSchedule();

const { 
    easyNotes, 
    isLoading, 
    error,
    isLoadComplete,
    refresh,
} = useFetchClassEasyNote();

onMounted(async () => {
    await refresh();
});
</script>

<template>
    <view class="mt-8">
        <class-easy-note-header 
            :noCourseOfToday="!currentCourseName && scheduleStore.lessons.length !== 0" 
        />

        <view class="pt-3">
            <notes
                :notes="easyNotes"
                :isLoading="isLoading"
                :error="error"
                :isLoadComplete="isLoadComplete"
                :refresh="refresh"
            />
        </view>
    </view>
</template>
