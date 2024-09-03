<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import billHeader from './_components/bill-header.vue';
import billItem from './_components/bill-item.vue';
// hooks
import useFetchBill from '@/hooks/useFetchBill';

const timeList = ref([
    {
        name: "今日",
        range: {
        }
    },
])


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
        <bill-header />
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
