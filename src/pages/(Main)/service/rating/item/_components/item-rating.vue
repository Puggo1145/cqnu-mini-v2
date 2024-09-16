<script setup lang="ts">
// components
import ratingBar from './rating-bar.vue';


type StarRatio = {
    "5.0": number;
    "4.0": number;
    "3.0": number;
    "2.0": number;
    "1.0": number;
}

interface ItemRatingProps {
    starRatio: StarRatio;
    avgRating: number;
    ratingCount: number;
}

const props = defineProps<ItemRatingProps>();
</script>

<template>
    <view class="mt-3 px-4 flex items-center justify-between gap-x-3">
        <view class="flex flex-col">
            <text class="text-2xl text-[#f09036] font-bold">
                {{ props.avgRating }}
            </text>
            <text class="text-xs text-secondary-foreground">
                {{ props.ratingCount }} 人评分
            </text>
        </view>
        <view class="flex-1 flex flex-col">
            <rating-bar :stars="5" :rating="props.starRatio['5.0']" />
            <rating-bar :stars="4" :rating="props.starRatio['4.0']" />
            <rating-bar :stars="3" :rating="props.starRatio['3.0']" />
            <rating-bar :stars="2" :rating="props.starRatio['2.0']" />
            <rating-bar :stars="1" :rating="props.starRatio['1.0']" />
        </view>
    </view>
</template>
