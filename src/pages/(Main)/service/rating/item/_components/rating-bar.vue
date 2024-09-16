<script setup lang="ts">
// static
import icons from '@/constants/icons';


interface IStarBarProps {
    stars: number;
    rating: number;
}
const props = defineProps<IStarBarProps>();
</script>

<template>
    <view class="flex-1 flex items-center gap-x-2">
        <view class="flex items-center justify-end w-10">
            <image
                v-for="_, index in props.stars"
                :key="index"
                :src="icons.rating.star"
                class="size-2"
            />
        </view>
        <view class="flex-1 bg-[#f3e5d2] h-1 rounded-full">
            <view
                class="bg-[#f09036] h-full"
                :style="{ width: props.rating * 100 + '%' }"
            />
        </view>
        <text class="w-7 text-[8px] text-secondary-foreground">
            {{ props.rating * 100 }} %
        </text>
    </view>
</template>
