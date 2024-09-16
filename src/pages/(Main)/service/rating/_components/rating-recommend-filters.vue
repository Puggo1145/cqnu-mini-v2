<script setup lang="ts">
import { ref } from 'vue';
// components
import tagSelector from '@/components/tag-selector.vue';
import cusSelect from '@/components/cus-select.vue';
// static
import icons from '@/constants/icons';
// hooks
import useFetchRatingItemTags from '@/hooks/useFetchRatingItemTags';
// store
import { useRatingRecommendationFilters } from '@/stores/rating/recommendation-filters';


// 筛选条件
const ratingRecommendationFilterStore = useRatingRecommendationFilters();

// 美食种类标签
const {
    tags,
    isFetching,
    error,
} = useFetchRatingItemTags();
const isTagExpanded = ref(false);
</script>

<template>
    <view :class="[
        'overflow-hidden w-full flex justify-between gap-x-2',
        isTagExpanded ? 'h-fit' : 'h-9'
    ]">
        <tag-selector
            class="flex-1"
            mode="single"
            :tags="tags"
            :selected-tags="ratingRecommendationFilterStore.selectedTag"
            :is-fetching="isFetching"
            :error="error"
            @change="tag => ratingRecommendationFilterStore.selectedTag = tag"
        />
        <image
            :src="icons.more"
            class="size-6"
            @click="isTagExpanded = !isTagExpanded"
        />
    </view>
    <view class="mt-3 flex items-center gap-x-4">
        <cus-select
            variant="mini"
            :value="ratingRecommendationFilterStore.selectedCanteenIndex"
            :range="ratingRecommendationFilterStore.canteenOptions"
            @change="e => ratingRecommendationFilterStore.selectedCanteenIndex = e.value"
        />
        <cus-select
            variant="mini"
            :value="ratingRecommendationFilterStore.selectedPriceSortIndex"
            :range="ratingRecommendationFilterStore.priceSortOptions"
            rangeKey="label"
            @change="e => ratingRecommendationFilterStore.selectedPriceSortIndex = e.value"
        />
        <cus-select
            variant="mini"
            :value="ratingRecommendationFilterStore.selectedRateIndex"
            :range="ratingRecommendationFilterStore.ratingOptions"
            rangeKey="label"
            @change="e => ratingRecommendationFilterStore.selectedRateIndex = e.value"
        />
    </view>
</template>
