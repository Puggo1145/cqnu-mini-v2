<script setup lang="ts">
import { withDefaults } from 'vue';
import icons from '@/constants/icons';

interface Props {
    size?: "default" | "small" | "medium" | "large";
    color?: "black" | "white";
}
const props = withDefaults(defineProps<Props>(), {
    size: "default",
    color: "black"
});

const size = {
    default: "size-8",
    small: "size-4",
    medium: "size-6",
    large: "size-12"
}

const color = {
    black: icons.loadingBlack,
    white: icons.loadingWhite
}
</script>

<template>
    <view class="overflow-hidden flex flex-col items-center justify-center size-fit">
        <image
            :src="color[props.color]"
            :class="[size[props.size], 'animate-spin']"
        />
        <slot />
    </view>
</template>
