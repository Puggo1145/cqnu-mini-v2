<script setup lang="ts">
// components
import cusInput from '@/components/cus-input.vue';
import cusSelect from '@/components/cus-select.vue';
</script>

<template>
    <view class="w-full flex-1 flex flex-col">
        <view class="flex flex-col gap-2">
            <text class="text-black font-bold text-[28px] mt-3">制定你的第一份Todo</text>
            <text class="text-black text-[12px] -mt-2 font-[300]">迈向目标的第一步，从认真制定一份计划开始</text>
        </view>

        <scroll-view 
            scroll-y
            class="w-full mt-6 overflow-hidden"
        >
            <cus-input
                field-name="计划内容"
            />

            <view class="mt-4 w-full flex items-center justify-between gap-x-4">
                <view class="w-full flex flex-col gap-y-1">
                    <text class="text-sm font-semibold text-secondary-foreground pl-1">
                        提醒日期
                    </text>
                    <cus-select
                        mode="date"
                        value="2022-01-01"
                        start="2022-01-01"
                    />
                </view>
                <view class="w-full flex flex-col gap-y-1">
                    <text class="text-sm font-semibold text-secondary-foreground pl-1">
                        提醒时间
                    </text>
                    <cus-select
                        mode="time"
                        value="19:00"
                        start="19:00"
                    />
                </view>
            </view>

            <view class="mt-4 w-full flex flex-col gap-y-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-1">
                    重复
                </text>
                <cus-select
                    value="从不"
                />
            </view>
        </scroll-view>
    </view>
</template>
