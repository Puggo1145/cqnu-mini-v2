<script setup lang="ts">
import { ref } from 'vue';
// components
import consumeCard from '@/pages/(Main)/service/_components/consume-card.vue';
import utilityCard from '@/pages/(Main)/service/_components/utility-card.vue';
import classEasyNote from './class-easy-note.vue';
import ratingRecommendFilters from '@/pages/(Main)/service/rating/_components/rating-recommend-filters.vue';
import recommendRatingItems from '@/pages/(Main)/service/rating/_components/recommend-rating-items.vue';
// hooks
import useFetchRecommendRating from '@/hooks/useFetchRecommendRating';

const currentTab = ref(0);
const tabs = ref([
    { name: "水电和消费" },
    { name: "美食推荐" },
    { name: "今日小记" },
]);

// 获取推荐美食数据
const {
    isFetching,
    error,
    isLoadComplete,
    recommendItems,
    fetchRecommendItems,
    refresh
} = useFetchRecommendRating();

function onTabChange(event: any) {
    currentTab.value = event.index;
}
</script>

<template>
    <view class="h-full flex flex-col mt-4">
        <!-- Tab 栏 -->
        <up-sticky class="px-4">
            <up-tabs
                :list="tabs"
                :current="currentTab"
                lineWidth="20"
                lineHeight="3"
                lineColor="#000"
                :activeStyle="{
                    color: '#000',
                    fontWeight: 'bold',
                    transform: 'scale(1.05)'
                }"
                :inactiveStyle="{
                    color: '#666',
                    transform: 'scale(1)'
                }"
                scrollable
                itemStyle="height: 44px"
                @click="onTabChange"
            />
        </up-sticky>

        <!-- Tab 内容 -->
        <swiper
            class="flex-1"
            :current="currentTab"
            @change="(e: any) => currentTab = e.detail.current"
        >
            <!-- 水电和消费 -->
            <swiper-item class="h-full">
                <scroll-view
                    scroll-y
                    class="h-full px-4"
                >
                    <view class="flex flex-col gap-y-4 py-4 pb-8">
                        <utility-card variant="secondary" />
                        <consume-card variant="secondary" />
                    </view>
                </scroll-view>
            </swiper-item>

            <!-- 美食推荐 -->
            <swiper-item class="h-full">
                <scroll-view
                    scroll-y
                    class="h-full px-4"
                    lower-threshold="50"
                    @scrolltolower="fetchRecommendItems"
                >
                    <view class="py-4 pb-8">
                        <rating-recommend-filters />
                        <recommend-rating-items
                            class="mt-4"
                            :is-fetching="isFetching"
                            :error="error"
                            :is-load-complete="isLoadComplete"
                            :recommend-items="recommendItems"
                            :refresh="refresh"
                        />
                    </view>
                </scroll-view>
            </swiper-item>

            <!-- 今日小记 -->
            <swiper-item class="h-full">
                <scroll-view
                    scroll-y
                    class="h-full px-4"
                >
                    <view class="pb-8">
                        <class-easy-note />
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template> 