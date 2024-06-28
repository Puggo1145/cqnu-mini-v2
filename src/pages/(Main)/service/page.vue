<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import utilityConsumeCards from './_components/utility-consume-cards.vue';
import cards from './_components/cards.vue';
// static
import images from '@/constants/images';
</script>

<template>
    <cus-page background-style="modern">
        <view class="w-full px-4 flex flex-col">
            <image :src="images.service.bg" class="z-0 fixed w-[255px] -right-4 top-2" />
            <view class="mt-9 w-full h-[80px]">
                <text class="font-bold text-3xl text-modern">生活服务</text>
            </view>
            <view class="relative z-10 flex flex-col gap-y-[14px]">
                <utility-consume-cards />
                <!-- 瓷片入口 -->
                <cards />
            </view>
        </view>
    </cus-page>
</template>