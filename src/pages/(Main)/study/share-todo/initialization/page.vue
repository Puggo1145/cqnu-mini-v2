<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';
// images
import images from '@/constants/images';


function goToCreateShareTodo() {
    uni.navigateTo({
        url: '/pages/(Main)/study/share-todo/initialization/first-todo/page'
    })
}
</script>

<template>
    <cus-page
        header-type="nav" 
        padding-x="16" 
        className="justify-between"
    >
        <view class="relative z-10 w-full h-full flex flex-col justify-between">
            <view class="py-5 flex flex-col gap-2">
                <text class="text-xb font-bold">
                    每一份<text class=" text-blue-700">努力</text>
                </text>
                <text class="text-xb font-bold -my-4">
                    都能被<text class=" text-blue-700 ">看见</text>
                </text>
                <text class="text-[#808080] text-[14px] my-4">
                    找到志同道合的学习搭子并和TA们共享Todo list
                </text>
            </view>

            <cus-button
                class="my-8" 
                @click="goToCreateShareTodo"
                disabled
                variant="muted"
            >
                功能未开放
            </cus-button>
        </view>

        <image
            :src="images.study.shareTodoAvatars" 
            class="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-full h-[480px] object-cover pointer-events-none"
        />
    </cus-page>
</template>
