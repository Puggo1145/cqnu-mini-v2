<script setup lang="ts">
const otherClasses = [
    {
        name: "计算机组成原理",
        time: "14 : 30",
    },
    {
        name: "web 开发实训",
        time: "16 : 30",
    },
    {
        name: "数据库原理",
        time: "19 : 30",
    }
]


function goToSchedule() {
    uni.navigateTo({
        url: '/pages/(Main)/study/schedule/page'
    })
}
</script>

<template>
    <!-- 最近一节课程 -->
    <view class="w-full">
        <view 
            class="w-full p-6 flex flex-col justify-between gap-2 
            rounded-2xl text-white leading-none bg-[#5670FD] shadow-lg shadow-[#5670FD]/20"
            @click="goToSchedule"
        >
            <view>
                <text class="text-sm">
                    距离上课还有 30 分钟
                </text>
            </view>
            <view class="w-full flex items-center justify-between">
                <text class="text-[32px] font-bold leading-none">计算机网络</text>
                <text class="text-2xl font-bold leading-none">10 : 30</text>
            </view>
            <text class="text-sm font-bold">
                弘德楼 14103
            </text>
        </view>
    </view>
    <!-- 今日课程列表 -->
    <scroll-view
        scroll-x
        class="mt-3 w-full whitespace-nowrap"
    >
        <view 
            v-for="item in otherClasses"
            :key="item.name"
            class="mr-3 p-5 pr-8 inline-flex flex-col gap-1 bg-secondary rounded-2xl text-secondary-foreground"
        >
            <text class="text-md font-bold whitespace-nowrap">{{ item.name }}</text>
            <text class="text-sm">{{ item.time }}</text>
        </view>
    </scroll-view>
</template>
