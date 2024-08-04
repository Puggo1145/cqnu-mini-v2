<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import spinner from '@/components/spinner.vue';
// static
import icons from '@/constants/icons';
// api
import { getNoteStatistics } from '@/api/easy-note';
// types
import type { EasyNoteStatistics } from '@/api/easy-note';


const statistics = reactive<EasyNoteStatistics>({
    weekCount: undefined,
    importanceCount: undefined,
    allCount: undefined,
});
onMounted(async () => {
    const data = await getNoteStatistics();
    if (data) {
        Object.assign(statistics, data);
    }
});


interface NoteStatisticsBlock {
    icon: string;
    iconBackgroundColor: string;
    title: string;
    count: number | undefined;
    backgroundColor: string;
}
const noteStatistics = computed<NoteStatisticsBlock[]>(() => [
    { 
        icon: icons.calendarWhite,
        iconBackgroundColor: "#90ad5f",
        title: "周内小记", 
        count: statistics.weekCount ?? undefined,
        backgroundColor: "#e1ecc8"
    },
    { 
        icon: icons.attentionWhite, 
        iconBackgroundColor: "#a6765a",
        title: "重要小记", 
        count: statistics.importanceCount ?? undefined,
        backgroundColor: "#f4ded1"
    },
    { 
        icon: icons.boxWhite, 
        iconBackgroundColor: "#638fac",
        title: "所有小记", 
        count: statistics.allCount ?? undefined,
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
                :style="{ 
                    backgroundColor: item.iconBackgroundColor,
                    boxShadow: '0 0 16px 2px ' + item.iconBackgroundColor
                }"
            >
                <image :src="item.icon" class="size-4" />
            </view>
            <view class="flex flex-col">
                <text class="text-fit-background text-sm">
                    {{ item.title }}
                </text>
                <view class="flex font-bold gap-1 items-end">
                    <spinner 
                        v-if="item.count === undefined"
                        size="small" 
                        color="black" 
                    />
                    <text
                        v-else
                        class="text-fit-background-darker text-4xl font-bold leading-none"
                    >
                        {{ item.count }}
                    </text>
                    <text class="text-fit-background-darker  text-sm font-bold">条</text>
                </view>
            </view>
        </view>
    </view>
</template>
