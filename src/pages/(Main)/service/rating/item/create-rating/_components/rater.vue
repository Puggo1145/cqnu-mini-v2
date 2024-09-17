<!-- src/components/rater.vue -->
<script setup lang="ts">
// static
import icons from '@/constants/icons';


const props = defineProps<{
    rating: number;
}>();

const emit = defineEmits(['change']);

function onRatingChange(value: number) {
    emit('change', value);
}
</script>

<template>
    <view class="flex items-center gap-x-3">
        <text class="text-md font-bold">推荐度</text>
        <view class="flex items-center gap-x-2">
            <view
                v-for="index in 5"
                :key="index"
                @click="onRatingChange(index)"
                class="size-8"
            >
                <image
                    v-if="index > props.rating"
                    :src="icons.rating.starHollow"
                    class="size-full"
                />
                <image
                    v-else
                    :src="icons.rating.starSolid"
                    class="size-full"
                />
            </view>
        </view>
    </view>
</template>