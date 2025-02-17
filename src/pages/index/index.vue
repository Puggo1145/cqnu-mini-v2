<script setup lang="ts">
// components
import cusPage from "@/components/cus-page.vue"
import cusButton from "@/components/cus-button.vue";
import flowTexts from "./_components/flow-texts.vue";
// static
import images from "@/constants/images";

const addOfficialAccount = async () => {
    uni.navigateTo({
        url: "/pages/(Main)/link-official/page?backPage=/pages/(Main)/today/page"
    })
};
</script>

<template>
    <cus-page header-type="none">
        <image
            :src="images.landing"
            mode="aspectFill"
            class="w-full h-[320px]"
        />
        <view class="overflow-hidden w-screen mt-8 mb-4">
            <flowTexts />
        </view>
        <!-- 首页欢迎文字 -->
        <view class="relative z-10 px-4 flex flex-col">
            <view class="font-bold text-[32px] flex flex-col">
                <text class="text-6xl mb-4">👌</text>
                <view>
                    <text>在重师</text>
                    <view>
                        <text>一个</text>
                        <text class="px-1 text-primary">APP</text>
                        <text>就够了</text>
                    </view>
                </view>
            </view>
            <cus-button
                @click="addOfficialAccount"
                class-name="mt-4 "
            >
                添加账号
            </cus-button>
        </view>
        <!-- 背景圆 -->
        <view class="z-0 overflow-hidden w-full h-[330px] absolute bottom-0 left-0">
            <view class="z-0 size-[724px] bg-[#f7f4f1] rounded-full absolute -bottom-[400px] -left-[280px]"></view>
        </view>
    </cus-page>
</template>