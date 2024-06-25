<script setup lang="ts">
import { ref } from 'vue';
// static
import icons from '@/constants/icons';
// mock
import { mockNoteStatistics } from '@/mock/easy-note';
// types
interface NoteStatisticsBlock {
    icon: string;
    iconBackgroundColor: string;
    title: string;
    count: number;
    backgroundColor: string;
}

const noteStatistics = ref<NoteStatisticsBlock[]>([
    { 
        icon: icons.calendar,
        iconBackgroundColor: "#90ad5f",
        title: "周内小记", 
        count: mockNoteStatistics.thisWeek ?? 0,
        backgroundColor: "#e1ecc8"
    },
    { 
        icon: icons.attention, 
        iconBackgroundColor: "#a6765a",
        title: "重要小记", 
        count: mockNoteStatistics.important ?? 0,
        backgroundColor: "#f4ded1"
    },
    { 
        icon: icons.box, 
        iconBackgroundColor: "#638fac",
        title: "所有小记", 
        count: mockNoteStatistics.total ?? 0,
        backgroundColor: "#d4ebfa"
    },
]);
</script>

<template>
    <!-- 小记统计 -->
    <view class="flex items-center gap-3 mt-4">
        <view 
            v-for="(item, index) in noteStatistics"
            :key="index"
            class="w-full h-[128px] rounded-2xl flex flex-col gap-3 p-3"
            :style="{ backgroundColor: item.backgroundColor }"
        >
            <view 
                class="size-8 rounded-full flex items-center justify-center"
                :style="{ backgroundColor: item.iconBackgroundColor }"
            >
                <image :src="item.icon" class="size-4" />
            </view>
            <view class="flex flex-col">
                <text class="text-fit-background text-sm">
                    {{ item.title }}
                </text>
                <view class="flex font-bold gap-1 items-end">
                    <text class="text-fit-background-darker text-4xl font-bold leading-none">
                        {{ item.count }}
                    </text>
                    <text class="text-fit-background-darker  text-sm font-bold">条</text>
                </view>
            </view>
        </view>
    </view>
</template>
