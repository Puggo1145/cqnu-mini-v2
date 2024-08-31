<script setup lang="ts">
// components
import cusButton from '@/components/cus-button.vue';
// static
import icons from '@/constants/icons';


interface IClassEasyNoteHeaderProps {
    noCourseOfToday: boolean;
}
const props = defineProps<IClassEasyNoteHeaderProps>();

function goToEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/page',
    });
}
</script>

<template>
    <view class="flex items-center justify-between">
        <text class="text-2xl font-bold">
            {{ props.noCourseOfToday ? "今日小记" : "课堂小记" }}
        </text>
        <cus-button
            variant="ghost"
            class-name="text-secondary-foreground font-normal"
            @click="goToEasyNote"
        >
            更多小记
            <image
                :src="icons.rightSecondary"
                class="w-5 h-5"
            />
        </cus-button>
    </view>

    <text
        v-if="props.noCourseOfToday"
        class="text-sm text-secondary-foreground"
    >
        今日课程已结束，快来看看今天有什么小记吧
    </text>
</template>
