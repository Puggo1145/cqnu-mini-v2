<script setup lang="ts">
// hooks
import useGreetingText from '@/hooks/useGreetingText';
// static
import icons from '@/constants/icons';
import logo from "@/static/icons/logo.png";

const functionBtns = {
    me: {
        icon: icons.setting,
        url: "/pages/(Main)/me/page"
    }
}

const { greetingText } = useGreetingText();

function goto(url: string) {
    uni.navigateTo({ url });
}
</script>

<template>
    <view class="w-full h-[80px] flex items-center justify-between gap-x-4 mt-12">
        <view class="flex items-center gap-x-2">
            <image
                :src="logo"
                class="size-10 rounded-full"
            />
            <!-- 动态提醒文本 -->
            <view class="text-3xl font-bold">
                {{ greetingText }}
            </view>
        </view>
        <!-- 右侧功能 -->
        <view class="flex items-center gap-5">
            <view
                v-for="(btn, index) in functionBtns"
                :key="index"
                class="size-9 overflow-hidden rounded-full bg-secondary p-1.5"
                @click="goto(btn.url)"
            >
                <image
                    :src="btn.icon"
                    class="size-full"
                />
            </view>
        </view>
    </view>
</template>
