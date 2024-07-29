<script setup lang="ts">
import { ref } from "vue";
// components
import cusPage from "@/components/cus-page.vue"
import cusButton from "@/components/cus-button.vue";
import flowTexts from "./_components/flow-texts.vue";
// static
import images from "@/constants/images";
// api
import { signin } from "@/api/auth";

const isSigningIn = ref(false);
const handleSignIn = async () => {
    isSigningIn.value = true;

    const res = await signin();
    isSigningIn.value = false;


    // 用户不存在，跳转到注册页
    if (res?.action === "signup") {
        uni.navigateTo({ url: "/pages/(Onboarding)/sign-up/page" });
    } else if (res?.action === "signin") {
        // 登录成功后跳转主页
        uni.switchTab({ url: "/pages/(Main)/today/page" });
    }
};


function gotoDevPage() {
    uni.navigateTo({ url: "/pages/dev/page" });
};
function gotoHome() {
    uni.switchTab({ url: "/pages/(Main)/today/page" });
}
</script>

<template>
    <cus-page header-type="none">
        <image :src="images.landing" mode="aspectFill" class="w-full h-[300px]" />
        <view class="overflow-hidden w-screen mt-8 mb-4">
            <flowTexts />
        </view>
        <!-- 首页欢迎文字 -->
        <view class="relative z-10 px-4 flex flex-col">
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
            <cus-button @click="handleSignIn" :variant="isSigningIn ? 'loading' : 'primary'" class-name="mt-4 ">
                {{ isSigningIn ? "" : "登录" }}
            </cus-button>
            <!-- dev buttons -->
            <view class="w-full flex gap-x-2 mt-2">
                <cus-button variant="outline" @click="gotoHome" class-name="w-full">
                    去主页
                </cus-button>
                <cus-button variant="outline" @click="gotoDevPage" class-name="w-full">
                    dev page
                </cus-button>
            </view>
        </view>
        <!-- 背景圆 -->
        <view class="z-0 overflow-hidden w-full h-[330px] absolute bottom-0 left-0">
            <view class="z-0 size-[724px] bg-[#f7f4f1] rounded-full absolute -bottom-[400px] -left-[280px]"></view>
        </view>
    </cus-page>
</template>