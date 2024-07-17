<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';

// images
import images from '@/constants/images';

// 函数跳转
function goCreateShareTodo() {
    uni.navigateTo({
        url: '/pages/(Main)/study/share-todo/_components/create-share-todo'
    })
}
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <view class="py-5 flex flex-col gap-2">
            <text class=" text-xb font-bold">每一份<text class=" text-blue-700">努力</text></text>
            <text class=" text-xb font-bold -my-4">都能被<text class=" text-blue-700 ">看见</text></text>
            <text class=" text-[#808080] text-[14px] my-4 text-[color: #808080]">找到志同道合的学习搭子并和TA们共享Todo list</text>
        </view>

        <view class=" size-full flex justify-center items-center">
            <image :src="images.study.shareTodoAvatars" class="img size-full object-cover"/>
        </view>
        <cus-button class=" my-8" @click="goCreateShareTodo">加入学搭todo</cus-button>
        
        
    </cus-page>
</template>

<style scoped>
.description{
    color: #808080;
}
.img{
    margin-top: -150px;
}
</style>
