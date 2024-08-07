<script setup lang="ts">
import { withDefaults } from 'vue';
// components
import cusButton from '@/components/cus-button.vue';
import images from '@/constants/images';


interface NoNoteProps {
    currentCourseName?: string | null;
}
const props = withDefaults(defineProps<NoNoteProps>(), {
    currentCourseName: null,
});


function goToCreateEasyNote() {
    uni.navigateTo({
        url: `/pages/(Main)/study/easy-note/create/page?courseName=${props.currentCourseName || ""}`
    });
}   
</script>

<template>
    <view class="w-full flex flex-col items-center">
        <view class="flex flex-col items-center mt-4 gap-y-1">
            <text class="font-bold text-2xl text-secondary-foreground">暂无小记</text>
            <text class="text-sm text-secondary-foreground">快和同学分享这节课的重要事项吧！</text>
        </view>
        <cusButton 
            class="z-50 mt-4" 
            variant="secondary"
            @click="goToCreateEasyNote"
        >
            创建小记
        </cusButton>
        <image 
            :src="images.NoEasyNote" 
            class="z-0 fixed right-0 -bottom-[30px] w-[220px] h-[180px]" 
        />
        <view class="h-4"></view>
    </view>
</template>
