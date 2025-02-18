<script setup lang="ts">
import utilityCard from './_components/utility-card.vue';
import consumeCard from './_components/consume-card.vue';
import cards from './_components/cards.vue';
</script>

<template>
    <view class="grid grid-cols-2 gap-[14px]">
        <utility-card />
        <consume-card />
        <!-- 瓷片入口 -->
        <cards class="col-span-2" />
    </view>
</template>