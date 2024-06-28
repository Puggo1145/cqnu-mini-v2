<script setup lang="ts">

</script>

<template>
    <view class="flex items-center justify-between gap-[14px]">
        <!-- 水电费余额 -->
        <view class="w-full h-[172px] bg-primary rounded-2xl 
        shadow-md shadow-primary px-4 py-5">
            <text class="text-white text-opacity-90 text-sm leading-none">
                水电费余额
            </text>
            <view class="mt-3">
                <text class="text-white font-bold text-4xl leading-none">
                    17.1
                </text>
                <text class="text-white text-sm">元</text>
            </view>
        </view>
        <!-- 本月在校消费 -->
        <view class="w-full h-[172px] bg-[#18B453] rounded-2xl
        shadow-md shadow-[#18B453] px-4 py-5">
            <text class="text-white text-opacity-90 text-sm leading-none">
                本月在校消费
            </text>
            <view class="mt-3">
                <text class="text-white font-bold text-4xl leading-none">
                    123
                </text>
                <text class="text-white text-sm">元</text>
            </view>
        </view>
    </view>
</template>
