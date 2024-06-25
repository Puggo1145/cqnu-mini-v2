<script setup lang="ts">
import { useStatusBarHeight } from '@/stores/statusBarHeight';
import { computed } from 'vue';
// icons
import icons from '@/constants/icons';

// deconstruct store
const { statusBarheight } = useStatusBarHeight();

// props
interface Props {
    // 内置 nav bar 样式
    headerType?: "none" | "default" | "nav"; 
    // 页面两侧边距 => 为了保证页面高度一致使用了 overflow-hidden，因此会裁切掉部分内容，需要酌情使用
    paddingX?: number | string; 
}
const { 
    headerType, 
    paddingX
} = defineProps<Props>();

// 处理 status bar height
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
        <!-- nav bar -->
        <view
            v-if="headerType === 'nav'"
            class="w-full h-[60px] flex px-4 items-center"
        >
            <view class="overflow-hidden size-6" @click="goBack">
                <image :src="icons.back" class="size-full" />
            </view>
        </view>
        <!-- 页面 -->
        <view 
            class="w-screen overflow-y-hidden flex-1 flex flex-col"
            :style="{
                paddingLeft: (paddingX || 0) + 'px',
                paddingRight: (paddingX || 0) + 'px',
            }"
        >
            <slot />
        </view>
    </view>
</template>