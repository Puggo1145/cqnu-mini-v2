<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import todoNoteCards from './_components/todo-note-cards.vue';  
import otherFunctions from './_components/other-functions.vue';
import cardNeedNewFunction from '@/components/card-need-new-function.vue';
// static
import images from '@/constants/images';
</script>

<template>
    <cus-page background-style="modern">
        <scroll-view 
            class="w-full flex-1 px-4"
            scroll-y    
        >
            <image :src="images.study.bg" class="z-0 fixed w-[255px] -right-4 top-2" />
            <view class="mt-9 w-full h-[80px]">
                <text class="font-bold text-3xl text-modern">学业中心</text>
            </view>
            <view class="flex-1 relative z-10 flex flex-col gap-y-[14px]">
                <todo-note-cards />
                <other-functions />
                <card-need-new-function />
            </view>
        </scroll-view>
    </cus-page>
</template>