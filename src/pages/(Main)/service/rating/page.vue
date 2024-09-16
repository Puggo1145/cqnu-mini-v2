<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import ratingHeader from './_components/rating-header.vue';
import ratingSubtitle from './_components/rating-subtitle.vue';
import ratingHot from './_components/rating-hot.vue';
import ratingRecommendFilters from './_components/rating-recommend-filters.vue';
import recommendRatingItems from './_components/recommend-rating-items.vue';
// hooks
import useFetchRecommendRating from '@/hooks/useFetchRecommendRating';


const {
    isFetching,
    error,
    isLoadComplete,
    recommendItems,
    fetchRecommendItems,
    refresh
} = useFetchRecommendRating();

</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <rating-header />
        <scroll-view
            class="overflow-hidden flex-1"
            scroll-y
            lower-threshold="50"
            @scrolltolower="fetchRecommendItems"
        >
            <rating-subtitle>当下热门</rating-subtitle>
            <rating-hot />
            <rating-subtitle>为你推荐</rating-subtitle>
            <rating-recommend-filters />
            <recommend-rating-items
                :is-fetching="isFetching"
                :error="error"
                :is-load-complete="isLoadComplete"
                :recommend-items="recommendItems"
                :refresh="refresh"
            />
        </scroll-view>
    </cus-page>
</template>
