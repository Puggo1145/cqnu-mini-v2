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
    paddingX?: number | string; // 两侧边距
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
        class="w-screen h-screen bg-background flex flex-col fixed" 
        :style="{ paddingTop: paddingTop }"
    >
        <view
            v-if="headerType === 'nav'"
            class="w-full h-[60px] flex px-4 items-center"
        >
            <view class="overflow-hidden size-6" @click="goBack">
                <image :src="icons.back" class="size-full" />
            </view>
        </view>
        <view 
            class="w-screen flex-1 flex flex-col"
            :style="{
                paddingLeft: (paddingX || 0) + 'px',
                paddingRight: (paddingX || 0) + 'px',
            }"
        >
            <slot />
        </view>
    </view>
</template>