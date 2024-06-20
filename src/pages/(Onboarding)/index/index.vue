<script setup lang="ts">
import { ref } from "vue";

import cusPage from "@/components/cus-page.vue"
// components
import cusButton from "@/components/cus-button.vue";
import flowTexts from "./_components/flow-texts.vue";
// images
import images from "@/constants/images";


const isSigningIn = ref(false);

const handleSignIn = () => {
    isSigningIn.value = true;
    setTimeout(() => {
        isSigningIn.value = false;
        uni.navigateTo({
            url: "/pages/(Onboarding)/sign-up/page",
        });
    }, 500);
};
</script>

<template>
    <cus-page header-type="none">
        <image :src="images.landing" class="w-full h-[310px] object-cover" />
        <view class="overflow-hidden w-screen my-4">
            <flowTexts />
        </view>
        <!-- 首页欢迎文字 -->
        <view class="relative z-10 px-4 flex flex-col gap-9">
            <view class="font-bold text-[32px] flex flex-col">
                <text class="text-6xl mb-4">👌</text>
                <view v-if="!isSigningIn">
                    <text>在重师</text>
                    <view>
                        <text>一个</text>
                        <text class="px-1 text-primary">APP</text>
                        <text>就够了</text>
                    </view>
                </view>
                <view v-else>
                    <text>正在连接新大陆</text>
                    <view>
                        <text>请稍候...</text>
                    </view>
                </view>
            </view>
            <cus-button 
                @click="handleSignIn" 
                :variant="isSigningIn ? 'muted' : 'primary'"
            >
                {{ isSigningIn ? "登录中" : "登录"}}
            </cus-button>
        </view>
        <!-- 背景圆 -->
        <view class="z-0 overflow-hidden w-full h-[330px] absolute bottom-0 left-0">
            <view class="z-0 size-[724px] bg-[#f7f4f1] rounded-full absolute -bottom-[400px] -left-[280px]"></view>
        </view>
    </cus-page>
</template>