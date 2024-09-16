<script setup lang="ts">
// hooks
import useFetchAnnouncement from '@/hooks/useFetchAnnouncement';
// static
import icons from '@/constants/icons';


const { announcement } = useFetchAnnouncement();

function gotoReport() {
    uni.navigateTo({
        url: `/pages/(dev)/report/page`
    });
}
</script>

<template>
    <view
        v-if="announcement"
        class="w-full bg-primary/15 rounded-2xl mb-3 flex items-center gap-x-3 p-4"
        @click="gotoReport"
    >
        <image
            :src="icons.announcement"
            class="size-6"
        />
        <text class="text-xs font-bold line-clamp-1">
            {{ announcement.title }}
        </text>
    </view>
</template>
