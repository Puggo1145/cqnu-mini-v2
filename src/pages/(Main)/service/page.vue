<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import utilityCard from './_components/utility-card.vue';
import consumeCard from './_components/consume-card.vue';
import cards from './_components/cards.vue';
// static
import images from '@/constants/images';
</script>

<template>
    <cus-page
        background-style="modern"
        padding-x="16"
    >
        <image
            :src="images.service.bg"
            class="z-0 fixed w-[255px] -right-4 top-2"
        />
        <view class="mt-9 w-full h-[80px]">
            <text class="font-bold text-3xl text-modern">生活服务</text>
        </view>
        <view class="grid grid-cols-2 gap-[14px]">
            <utility-card />
            <consume-card />
            <!-- 瓷片入口 -->
            <cards class="col-span-2" />
        </view>
    </cus-page>
</template>