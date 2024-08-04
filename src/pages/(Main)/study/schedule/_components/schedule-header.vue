<script setup lang="ts">
// utils
import { getDate } from '@/utils/timeHandler';
// static
import icons from '@/constants/icons';


interface ScheduleHeaderProps {
    currentWeek: number;
    currentViewingWeek: number;
    isTermStarted: boolean;
}
const props = defineProps<ScheduleHeaderProps>();
</script>

<template>
    <view class="px-4 pr-6 flex justify-between items-center">
        <view class="flex flex-col gap-y-1">
            <text class="font-bold">
                {{ getDate("/") }}
            </text>
            <view class="text-secondary-foreground">
                <text>
                    第{{ props.currentWeek }}周
                </text>
                <text 
                    v-if="props.currentWeek !== props.currentViewingWeek || !props.isTermStarted"
                    class="ml-2"
                >
                    非本周
                </text>
            </view>
        </view>
        <!-- 课表相关功能 -->
        <view class="flex items-center gap-x-3">
            <button class="size-8 flex items-center justify-center">
                <image :src="icons.syncBlack" class="size-6" />
            </button>
        </view>
    </view>
</template>
