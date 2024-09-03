<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import ratingHeader from './_components/rating-header.vue';
import ratingSubtitle from './_components/rating-subtitle.vue';
import ratingHot from './_components/rating-hot.vue';
import ratingRecommendation from './_components/rating-recommendation.vue';
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <rating-header />
        <rating-subtitle>当下热门</rating-subtitle>
        <rating-hot />
        <rating-subtitle>为你推荐</rating-subtitle>
        <rating-recommendation />
    </cus-page>
</template>
