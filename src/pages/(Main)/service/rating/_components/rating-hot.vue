<script setup lang="ts">
// components
import hotCard from './hot-card/hot-card.vue';
import hotCardImg from './hot-card/hot-card-img.vue';
import hotCardContent from './hot-card/hot-card-content.vue';
import hotCardTitle from './hot-card/hot-card-title.vue';
import hotCardDesc from './hot-card/hot-card-desc.vue';
import hotCardRate from './hot-card/hot-card-rate.vue';
</script>

<template>
    <scroll-view
        class="w-full h-[221px] overflow-x-auto"
        style="
            display: flex;
        "
        scroll-x
        enable-flex
    >
        <hot-card
            v-for="index in 3"
            :key="index"
            class="mr-3 h-fit"
        >
            <hot-card-img></hot-card-img>
            <hot-card-content>
                <hot-card-title>金汤肥牛米线</hot-card-title>
                <hot-card-desc>一食堂 重庆江湖</hot-card-desc>
                <hot-card-rate>4.9</hot-card-rate>
            </hot-card-content>
        </hot-card>
    </scroll-view>
</template>
