<script setup lang="ts">
import { onMounted } from 'vue';
// hooks
import useFetchRatingHot from '@/hooks/useFetchRatingHot';
// components
import hotCard from './hot-card/hot-card.vue';
import hotCardImg from './hot-card/hot-card-img.vue';
import hotCardContent from './hot-card/hot-card-content.vue';
import hotCardTitle from './hot-card/hot-card-title.vue';
import hotCardDesc from './hot-card/hot-card-desc.vue';
import hotCardRate from './hot-card/hot-card-rate.vue';
import hotStatusBox from './hot-card/hot-status-box.vue';
import spinner from '@/components/spinner.vue';


const {
    isFething,
    error,
    hotRatingItem,
    fetchHotRatingItem
} = useFetchRatingHot();

onMounted(async () => await fetchHotRatingItem());


function goToRatingItemDetail(id: number) {
    uni.navigateTo({
        url: `/pages/(Main)/service/rating/item/page?id=${id}`
    });
}
</script>

<template>
    <scroll-view
        class="w-full h-[220px] overflow-x-auto"
        style="
            display: flex;
        "
        scroll-x
        enable-flex
    >
        <hot-status-box v-if="isFething">
            <spinner size="medium" />
        </hot-status-box>
        <hot-status-box v-else-if="error">
            <text class="text-sm text-destructive">
                获取热门菜品出错
            </text>
        </hot-status-box>
        <hot-status-box v-else-if="!isFething && hotRatingItem.length === 0">
            <text class="text-sm text-secondary-foreground">
                暂无热门菜品
            </text>
        </hot-status-box>

        <hot-card
            v-else
            v-for="item in hotRatingItem"
            :key="item.id"
            class="mr-3 h-fit"
            @click="goToRatingItemDetail(item.id)"
        >
            <hot-card-img :img="item.imageUrl" />
            <hot-card-content>
                <hot-card-title>{{ item.name }}</hot-card-title>
                <hot-card-desc>{{ item.canteernName }} {{ item.diningRoom }}</hot-card-desc>
                <text
                    v-if="item.ratingWeight === 0"
                    class="text-xs text-secondary-foreground h-8"
                >
                    暂无评分，快去评分吧！
                </text>
                <hot-card-rate v-else>
                    {{ item.ratingWeight }}
                </hot-card-rate>
            </hot-card-content>
        </hot-card>
    </scroll-view>
</template>
