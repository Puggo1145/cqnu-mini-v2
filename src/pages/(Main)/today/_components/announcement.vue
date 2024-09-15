<script setup lang="ts">
// hooks
import useFetchAnnouncement from '@/hooks/useFetchAnnouncement';
// static
import icons from '@/constants/icons';


const {
    content,
    // error
} = useFetchAnnouncement();

// function gotoReport() {
//     uni.navigateTo({
//         url: '/pages/(dev)/report/page'
//     });
// }
</script>

<template>
    <view v-if="content" class="w-full bg-primary/15 rounded-2xl mb-3 flex items-center gap-x-3 p-4">
        <image
            :src="icons.announcement"
            class="size-6"
        />
        <text class="text-xs font-bold line-clamp-1">
            {{ content }}
        </text>
    </view>
</template>
