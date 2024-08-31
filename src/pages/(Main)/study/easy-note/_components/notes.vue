<script setup lang="ts">
// components
import requireSchedule from './require-schedule.vue';
import loading from '@/components/loading.vue';
import noNote from '@/pages/(Main)/today/_components/no-note.vue';
import cusError from '@/components/cus-error.vue';
import easyNoteCard from './easy-note-card.vue';
import addEasyNoteBlock from '@/pages/(Main)/today/_components/add-easy-note-block.vue';
// types
import type { EasyNoteCard } from './easy-note-card.vue';


interface IClassEasyNoteProps {
    noSchedule: boolean;
    notes: EasyNoteCard[] | undefined;
    error: boolean;
}
const props = defineProps<IClassEasyNoteProps>();
</script>

<template>
    <!-- 小记状态 -->
    <require-schedule
        v-if="props.noSchedule"
        class="mt-4"
    />
    <loading
        v-else-if="!props.notes && !props.error"
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

    <view
        v-else
        class="flex flex-col gap-3"
    >
        <easy-note-card
            v-for="note in props.notes"
            :key="note.id"
            :card="note"
        />
        <add-easy-note-block />
    </view>
</template>
