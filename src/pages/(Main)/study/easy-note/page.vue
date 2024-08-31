<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import easyNoteHeader from './_components/easy-note-header.vue';
import easyNoteStatistic from './_components/easy-note-statistic.vue';
import easyNoteFilter from './_components/easy-note-filter.vue';
import notes from './_components/notes.vue';
// static
import icons from '@/constants/icons';
// store
import useFetchEasyNote from '@/hooks/useFetchEasyNote';


const {
    easyNotes,
    isLoading,
    error,
    isLoadComplete,
    fetchNotes,
} = useFetchEasyNote();
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <cus-input
            :icon="icons.search"
            placeholder="查找小记"
        />
        <easy-note-header />
        <easy-note-statistic />
        <view class="mt-6 flex-1 overflow-hidden flex flex-col">
            <easy-note-filter />
            <view class="mt-4 flex-1">
                <notes
                    :notes="easyNotes"
                    :isLoading="isLoading"
                    :error="error"
                    :isLoadComplete="isLoadComplete"
                    :refresh="fetchNotes"
                />
            </view>
        </view>
    </cus-page>
</template>
