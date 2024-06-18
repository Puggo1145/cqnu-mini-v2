<script setup lang="ts">
import { useStatusBarHeight } from '@/stores/statusBarHeight';
import { computed } from 'vue';
// icons
import icons from '@/constants/icons';

// deconstruct store
const { statusBarheight } = useStatusBarHeight();

// props
interface Props {
    headerType?: "none" | "default" | "nav"; 
    paddingX?: number; // 两侧边距
}

const { 
    headerType, 
    paddingX
} = defineProps<Props>();
// process props
const paddingTop = computed(() => {
    return headerType === "none"
        ? '0px' 
        : statusBarheight.toString() + 'px'
});

const goBack = () => uni.navigateBack();
</script>

<template>
    <view 
        class="overflow-hidden w-screen h-screen bg-background" 
        :style="{
            paddingTop: paddingTop,
            paddingLeft: (paddingX || 0) + 'px',
            paddingRight: (paddingX || 0) + 'px',
        }"
    >
        <view
            v-if="headerType === 'nav'"
            class="w-full h-[60px] flex px-4 items-center"
        >
            <view class="overflow-hidden size-6" @click="goBack">
                <image :src="icons.back" class="size-full" />
            </view>
        </view>
        <slot />
    </view>
</template>