<script setup lang="ts">
// components
import recommendItemCard from './recommend-item-card/recommend-item-card.vue';
import recommendItemImg from './recommend-item-card/recommend-item-img.vue';
import recommendItemBody from './recommend-item-card/recommend-item-body.vue';
import recommendItemInfo from './recommend-item-card/recommend-item-info.vue';
import recommendItemTitle from './recommend-item-card/recommend-item-title.vue';
import recommendItemDesc from './recommend-item-card/recommend-item-desc.vue';
import recommendItemBadge from './recommend-item-card/recommend-item-badge.vue';
import recommendItemRating from './recommend-item-card/recommend-item-rating.vue';
import statusBox from './status-box.vue';
import spinner from '@/components/spinner.vue';
import cusButton from '@/components/cus-button.vue';
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


function goToRatingItemDetail(id: number) {
    uni.navigateTo({
        url: `/pages/(Main)/service/rating/item/page?id=${id}`
    });
}
</script>

<template>
    <view class="mt-3">
        <status-box v-if="isFetching">
            <spinner
                class="mt-3"
                size="medium"
            />
        </status-box>

        <status-box v-if="!isFetching && recommendItems.length === 0">
            <text class="mt-3 text-sm text-secondary-foreground">
                暂无相关推荐，快去创建一个吧！
            </text>
        </status-box>

        <status-box v-if="error">
            <text class="mt-3 text-sm text-secondary-foreground">
                加载失败，请重试
            </text>
            <cus-button
                variant="secondary"
                @click="refresh"
            >
                重试
            </cus-button>
        </status-box>


        <recommend-item-card
            v-else
            v-for="item in recommendItems"
            :key="item.id"
            @click="goToRatingItemDetail(item.id)"
        >
            <recommend-item-img :img="item.imageUrl" />
            <recommend-item-body class="flex-1">
                <recommend-item-info>
                    <recommend-item-title>{{ item.name }}</recommend-item-title>
                    <recommend-item-desc>{{ item.canteenName }} {{ item.diningRoom }}</recommend-item-desc>
                    <recommend-item-desc>{{ item.price }} 元 {{ item.recentRatingCount }} 人最近评分</recommend-item-desc>
                    <recommend-item-badge v-if="item.description">
                        {{ item.description }}
                    </recommend-item-badge>
                </recommend-item-info>
                <recommend-item-rating>
                    <text class="text-xs text-secondary-foreground">{{ item.ratingCount }} 人评分</text>
                    <text
                        v-if="item.avgRating === 0"
                        class="text-sm text-secondary-foreground"
                    >
                        暂无评分
                    </text>
                    <text
                        v-else
                        class="text-3xl text-[#f09036] font-bold"
                    >
                        {{ item.avgRating.toFixed(1) }}
                    </text>
                </recommend-item-rating>
            </recommend-item-body>
        </recommend-item-card>
        <view
            v-if="recommendItems.length > 0"
            class="h-8 flex items-center justify-center text-sm text-secondary-foreground"
        >
            {{ isLoadComplete ? "已经到底了" : "加载中" }}
        </view>
    </view>
</template>
