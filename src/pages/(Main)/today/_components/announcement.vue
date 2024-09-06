<script setup lang="ts">
// hooks
import useFetchAnnouncement from '@/hooks/useFetchAnnouncement';
// static
import icons from '@/constants/icons';


const {
    content,
    // error
} = useFetchAnnouncement();
</script>

<template>
    <view
        v-if="content"
        class="w-full h-[60px] bg-primary/15 rounded-2xl mb-3 flex items-center gap-x-3 px-4 py-[18px]"
    >
        <image
            :src="icons.announcement"
            class="size-6"
        />
        <text class="text-sm font-bold">
            {{ content || "announcement mock info" }}
        </text>
    </view>
</template>
