<script setup lang="ts">
// assets
import images from '@/constants/images';
</script>

<template>
    <view class="flex justify-between gap-[14px]">
        <!-- 水电费余额 -->
        <view class="relative w-full h-[172px] bg-primary rounded-2xl 
        shadow-md shadow-primary px-4 py-5">
            <text class="text-white text-opacity-90 text-sm leading-none">
                水电费余额
            </text>
            <view class="mt-3">
                <text class="text-white font-bold text-4xl">
                    17.1
                </text>
                <text class="text-white text-sm -ml-2">元</text>
            </view>
            <image :src="images.service.utility" class="absolute size-[110px] right-0 -bottom-[14px]" />
        </view>
        <!-- 本月在校消费 -->
        <view class="relative w-full h-[172px] bg-[#18B453] rounded-2xl
        shadow-md shadow-[#18B453] px-4 py-5">
            <text class="text-white text-opacity-90 text-sm">
                本月在校消费
            </text>
            <view class="mt-3">
                <text class="text-white font-bold text-4xl">
                    123
                </text>
                <text class="text-white text-sm -ml-2">元</text>
            </view>
            <image :src="images.service.card" class="absolute size-[110px] right-0 -bottom-[14px]" />
        </view>
    </view>
</template>
