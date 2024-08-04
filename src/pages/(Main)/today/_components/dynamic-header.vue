<script setup lang="ts">
// store
import useUserInfo from '@/stores/user-info';
// static
import icons from '@/constants/icons';


const functionBtns = {
    notification: {
        icon: icons.notification,
        url: "/notification"
    },
    me: {
        icon: icons.me,
        url: "/pages/(Main)/me/page"
    }
}


const userInfo = useUserInfo();


const goto = (url: string) => uni.navigateTo({ url });
</script>

<template>
    <view class="w-full h-[80px] flex items-center justify-between mt-12">
        <!-- 动态提醒文本 -->
        <view class="font-bold text-3xl">
            早上好 {{ userInfo.username }}
        </view>
        <!-- 右侧功能 -->
        <view class="flex items-center gap-5">
            <view
                v-for="(btn, index) in functionBtns"
                :key="index"
                class="size-8 overflow-hidden"
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