<script setup lang="ts">
// components
import requireSchedule from './require-schedule.vue';
import loading from '@/components/loading.vue';
import noNote from '@/pages/(Main)/today/_components/no-note.vue';
import cusError from '@/components/cus-error.vue';
import easyNoteCard from './easy-note-card.vue';
// import addEasyNoteBlock from '@/pages/(Main)/today/_components/add-easy-note-block.vue';
// store
import { useSchedule } from '@/stores/useSchedule';
// types
import type { EasyNoteCard } from './easy-note-card.vue';


interface IEasyNoteProps {
    notes: EasyNoteCard[];
    isLoading: boolean;
    error: boolean;
    isLoadComplete: boolean;
    refresh: () => Promise<void>;
}
const props = defineProps<IEasyNoteProps>();
const scheduleStore = useSchedule();
</script>

<template>
    <!-- 小记状态 -->
    <require-schedule
        v-if="scheduleStore.lessons.length === 0"
        class="mt-4"
    />
    <loading
        v-else-if="props.isLoading && !props.error && props.notes.length === 0"
        class="mt-4"
    />
    <no-note
        v-else-if="props.notes && props.notes.length === 0"
        class="mt-4"
    />
    <cus-error
        v-else-if="props.error"
        class="mt-4"
    />


    <scroll-view
        v-else
        class="overflow-hidden h-full"
        scroll-y
        lower-threshold="50"
        @scrolltolower="props.refresh"
    >
        <view class="flex flex-col gap-3">
            <easy-note-card
                v-for="note in props.notes"
                :key="note.id"
                :card="note"
            />
            <!-- <add-easy-note-block v-if="isLoadComplete" /> -->
        </view>
        <view class="h-12 flex items-center justify-center text-sm text-secondary-foreground">
            {{ isLoading ? '加载小记中' : '' }}
            {{ isLoadComplete ? '已经到底了！' : '' }}
        </view>
    </scroll-view>
</template>
