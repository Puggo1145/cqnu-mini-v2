<script setup lang="ts">
import icons from '@/constants/icons';

interface Props {
    size?: "default" | "small" | "medium" | "large";
    color?: "black" | "white";
}
const props = defineProps<Props>();

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
        :class="props.size ? size[props.size] : size['default']"
    >
        <image 
            :src="props.color ? color[props.color] : color.black" 
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