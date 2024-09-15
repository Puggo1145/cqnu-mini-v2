<script setup lang="ts">
import { ref } from 'vue';
// components
import tagSelector from '@/components/tag-selector.vue';
import cusSelect from '@/components/cus-select.vue';
// static
import icons from '@/constants/icons';
// hooks
import useFetchRatingItemTags from '@/hooks/useFetchRatingItemTags';
// constants
import { baseConfigs } from '@/constants/baseConfig';
// types
import type { Tag } from '@/components/tag-selector.vue';


// 美食种类标签
const {
    tags,
    isFetching,
    error
} = useFetchRatingItemTags();
const selectedTag = ref<Tag[]>([]);
const isTagExpanded = ref(false);


// 筛选条件
const canteenOptions = ["所有食堂", ...baseConfigs.canteens]
const priceSortOptions = [
    { label: '全部', value: "" },
    { label: '价格从高到低', value: "desc" },
    { label: '价格从低到高', value: "asc" },
];
const ratingOptions = [
    { label: '4分高分', value: 4 },
    { label: '5分好评', value: 5 },
]
</script>

<template>
    <view :class="[
        'overflow-hidden w-full flex justify-between items-center gap-x-2',
        isTagExpanded ? 'h-fit' : 'h-9'
    ]">
        <tag-selector
            class="flex-1"
            mode="single"
            :tags="tags"
            :selected-tags="selectedTag"
            :is-fetching="isFetching"
            :error="error"
            @change="tag => selectedTag = tag"
        />
        <image
            :src="icons.more"
            class="size-6"
        />
    </view>
    <view class="mt-3 flex items-center gap-x-4">
        <cus-select
            variant="mini"
            :value="0"
            :range="canteenOptions"
        />
        <cus-select
            variant="mini"
            :value="0"
            :range="priceSortOptions"
            rangeKey="label"
        />
        <cus-select
            variant="mini"
            :value="0"
            :range="ratingOptions"
            rangeKey="label"
        />
    </view>
</template>
