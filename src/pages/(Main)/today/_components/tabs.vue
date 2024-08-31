<script setup lang="ts">
import { reactive } from 'vue';
// static
import icons from '@/constants/icons';


const tabs = reactive([
    { name: "课程" },
    { name: "打卡" },
])
</script>

<template>
    <up-sticky>
        <view class="flex items-center justify-between">
            <up-tabs
                class="flex-1"
                :list="tabs"
                :scrollable="false"
                line-width="28"
                line-color="#000"
                :active-style="{
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '20px',
                    marginBottom: '2px'
                }"
                :inactive-style="{
                    color: '#6D7985',
                    fontWeight: 'normal',
                    lineHeight: '20px',
                }"
                item-style="height: 30px"
            />
            <view class="size-6 overflow-hidden flex items-center justify-center mr-3">
                <image
                    :src="icons.plus"
                    class="size-full"
                />
            </view>
        </view>
    </up-sticky>
</template>
