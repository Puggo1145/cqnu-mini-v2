<script setup lang="ts">
// components
import tagSelector from '@/components/tag-selector.vue';
import cusSelect from '@/components/cus-select.vue';


const tags = [
    { id: 1, tagName: "米饭" },
    { id: 2, tagName: "面食" },
    { id: 3, tagName: "小吃" },
    { id: 4, tagName: "汉堡" },
    { id: 5, tagName: "奶茶" },
];
const canteenOptions = [
    "所有食堂"
]
const priceSortOptions = [
    "价格由高到低",
    "价格由低到高"
]
const rateOptions = [
    "5分",
    "4分以上",
    "3分以上",
    "2分以上",
    "1分以上"
]
</script>

<template>
    <view class="flex flex-col gap-y-3">
        <tag-selector :tags="tags" />
        <view class="flex items-center gap-x-4">
            <cus-select
                variant="mini"
                :value="0"
                :range="canteenOptions"
            />
            <cus-select
                variant="mini"
                :value="0"
                :range="priceSortOptions"
            />
            <cus-select
                variant="mini"
                :value="0"
                :range="rateOptions"
            />
        </view>
    </view>
</template>
