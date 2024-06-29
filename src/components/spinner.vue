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
    <view 
        class="overflow-hidden flex items-center justify-center" 
        :class="size[props.size]"
    >
        <image 
            :src="color[props.color]"
            class="spin size-full" 
        />
    </view>
</template>

<style scoped>
.spin {
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>