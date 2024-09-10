<script setup lang="ts">
// hooks
// import useFetchAnnouncement from '@/hooks/useFetchAnnouncement';
// static
import icons from '@/constants/icons';


// const {
//     content,
//     // error
// } = useFetchAnnouncement();

function gotoReport() {
    uni.navigateTo({
        url: '/pages/(dev)/report/page'
    });
}
</script>

<template>
    <view 
        class="w-full bg-primary/15 rounded-2xl mb-3 flex items-center gap-x-3 p-4"
        @click="gotoReport"
    >
        <image
            :src="icons.code"
            class="size-6"
        />
        <text class="text-sm font-bold line-clamp-1">
            <!-- {{ content || "announcement mock info" }} -->
            查看9月11日开发者报告 (更新与问题说明)
        </text>
    </view>
</template>
