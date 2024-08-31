<script setup lang="ts">
// components
import cusButton from '@/components/cus-button.vue';
// stores
import { useSchedule } from '@/stores/useSchedule';
import { useEasyNoteStore } from '@/stores/easy-note/easy-note'
import { computed } from 'vue';


const scheduleStore = useSchedule();
const easyNoteStore = useEasyNoteStore();
const notesLength = computed(() => easyNoteStore.notes?.length ? easyNoteStore.notes?.length : 0) 


function gotoCreateEasyNote() {
    uni.navigateTo({
        url: "/pages/(Main)/study/easy-note/create/page"
    });
}
</script>

<template>
    <!-- header -->
    <view class="flex items-center justify-between mt-8">
        <view class="flex flex-col">
            <text class="text-3xl font-bold leading-none">班级小记</text>
        </view>
        <cus-button
            v-if="scheduleStore.lessons.length !== 0"
            variant="secondary" 
            class-name="w-[122px] !text-primary"
            @click="gotoCreateEasyNote"
        >
            + 创建小记
        </cus-button>
    </view>
</template>
