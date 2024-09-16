<script setup lang="ts">
// components
import cusButton from '@/components/cus-button.vue';
import itemBadge from './item-badge.vue';
import itemRating from './item-rating.vue';


export type StarRatio = {
    "5.0": number;
    "4.0": number;
    "3.0": number;
    "2.0": number;
    "1.0": number;
}
export type TagRespDto = {
    id: number;
    tagName: string;
    tagType: number;
    category: string;
}
export interface IRatingItemDetailInfo {
    name: string;
    username: string;
    price: number;
    canteenName: string;
    diningRoom: string;
    starRatio: StarRatio;
    ratingCount: number;
    avgRating: number;
    tagRespDtoList: TagRespDto[];
}


const props = defineProps<IRatingItemDetailInfo>();
</script>

<template>
    <view class="px-4 w-full flex flex-col gap-y-3">
        <view class="flex items-center justify-between">
            <view class="flex flex-col gap-y-1">
                <text class="text-2xl font-bold">
                    {{ props.name }} {{ props.price }}元
                </text>
                <text class="text-xs text-secondary-foreground">
                    由 {{ props.username }} 创建
                </text>
            </view>
            <cus-button
                variant="secondary"
                class-name="!text-primary"
            >
                评分
            </cus-button>
        </view>
        <view class="flex gap-x-2">
            <item-badge>
                <text class="text-xs text-secondary-foreground">
                    {{ props.canteenName }}
                </text>
            </item-badge>
            <item-badge>
                <text class="text-xs text-secondary-foreground">
                    {{ props.diningRoom }}
                </text>
            </item-badge>
            <item-badge>
                <text class="text-xs text-secondary-foreground">
                    {{ props.tagRespDtoList[0].tagName }}
                </text>
            </item-badge>
        </view>
        <item-rating
            :star-ratio="props.starRatio"
            :avg-rating="props.avgRating"
            :rating-count="props.ratingCount"
        />
    </view>
</template>
