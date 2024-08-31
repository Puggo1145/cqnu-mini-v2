<script setup lang="ts">
// components
import cusSelect from '@/components/cus-select.vue';
// store
import { useEasyNoteFilters } from '@/stores/easy-note/easy-note-filters';


// 选中 option 的对应 index
const easyNoteFiltersStore = useEasyNoteFilters();

function onTimeRangeChange(e: any) {
    easyNoteFiltersStore.timeRange = e.value;
}
function onRelatedCourseChange(e: any) {
    easyNoteFiltersStore.courseName = e.value;
}
function onTagChange(e: any) {
    easyNoteFiltersStore.tag = e.value;
}
</script>

<template>
    <view class="flex items-center gap-x-3">
        <cus-select
            :value="easyNoteFiltersStore.timeRange"
            :range="easyNoteFiltersStore.timeRangeOptions"
            @change="onTimeRangeChange"
            variant="mini"
        />
        <cus-select
            :value="easyNoteFiltersStore.courseName"
            :range="easyNoteFiltersStore.courseNameOptions"
            @change="onRelatedCourseChange"
            variant="mini"
        />
        <cus-select
            :value="easyNoteFiltersStore.tag"
            :range="easyNoteFiltersStore.tagsOptions"
            @change="onTagChange"
            variant="mini"
        />
    </view>
</template>
