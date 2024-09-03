<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import billItem from './_components/bill-item.vue';
// hooks
import useFetchBill from '@/hooks/useFetchBill';

const {
    bill,
    isFetching,
    error,
    isLoadComplete,
    refresh
} = useFetchBill();
</script>

<template>
    <cusPage
        header-type="nav"
        padding-x="16"
    >
        <view class="mb-8">
            <text class="ml-2 text-3xl font-bold">
                我的账单
            </text>
        </view>
        <scroll-view
            scroll-y
            class="overflow-hidden w-full flex-1"
        >
            <bill-item
                v-for="item, index in bill"
                :key="index"
                :bill="item"
            />
            <!-- 占位 -->
            <view class="h-6"></view>
        </scroll-view>
    </cusPage>
</template>
