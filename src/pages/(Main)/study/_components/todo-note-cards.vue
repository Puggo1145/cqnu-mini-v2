<script setup lang="ts">
// static
import images from '@/constants/images';


const cards = [
    {
        name: "学搭 Todo",
        description: "发现学搭 共同进步",
        image: images.study.todo,
        backgroundColor: "#598af6",
        url: "/pages/(Main)/study/share-todo/initialization/page",
        available: true,
    },
    {
        name: "班级小记",
        description: "整理你的学业",
        image: images.study.easyNote,
        backgroundColor: "#649ef3",
        url: '/pages/(Main)/study/easy-note/page',
        available: true,
    },
]


function goTo(available: boolean, url: string) {
    if (!available) {
        return uni.showToast({
            title: '功能未开放',
            icon: 'none',
        });
    }

    uni.navigateTo({ url });
}
</script>

<template>
    <view class="flex justify-between gap-x-4">
        <view 
            v-for="card in cards"
            :key="card.name"
            class="overflow-hidden relative w-full h-[108px] px-4 py-5 rounded-2xl"
            :style="{ backgroundColor: card.backgroundColor }"
            @click="goTo(card.available, card.url)"
        >
            <view class="flex flex-col relative z-10">
                <text class="text-2xl font-bold text-white">{{ card.name }}</text>
                <text class="text-xs text-white bg-opacity-90">{{ card.description }}</text>
            </view>
            <image :src="card.image" class="absolute z-0 size-[92px] right-1 -bottom-2" />
        </view>
    </view>
</template>
