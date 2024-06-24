<script setup lang="ts">

</script>

<template>
    <view class="w-full rounded-2xl bg-[#e9ecf7] p-4 flex items-center justify-between">
        <view class="flex flex-col">
            <text class="text-md font-bold">
                下节课要带的资料
            </text>
            <view class="text-sm flex items-center gap-2 text-black text-opacity-35">
                <text>计算机网络</text>
                <text>2024/9/14 - 10:30</text>
            </view>
            <text class="text-sm text-black text-opacity-35">
                来自 Puggo
            </text>
        </view>
        <!-- 查看人数 -->
        <view class="flex flex-col justify-between items-end gap-y-2">
            <text class="text-sm text-black text-opacity-35">
                有 24 人查看
            </text>
            <view class="flex">
                <view class="-ml-2 size-8 rounded-full border bg-primary"></view>
                <view class="-ml-2 size-8 rounded-full border bg-primary"></view>
                <view class="-ml-2 size-8 rounded-full border bg-primary"></view>
            </view>
        </view>
    </view>
</template>
