<script setup lang="ts">
import { computed, withDefaults } from 'vue';
// stores
import { useStatusBarHeight } from '@/stores/statusBarHeight';
// static
import icons from '@/constants/icons';


interface Props {
    // 内置 nav bar 样式: default 只令页面在状态栏之下，nav 会显示一个包含返回按钮的 header
    headerType?: "none" | "default" | "nav";
    backgroundStyle?: "none" | "default" | "modern"
    // 页面两侧边距 => 为了保证页面高度一致使用了 overflow-hidden，因此会裁切掉部分内容，需要酌情使用
    paddingX?: number | string; 
}
const props = withDefaults(defineProps<Props>(), {
    headerType: "default",
    backgroundStyle: "default",
    paddingX: 0
});


// 处理 status bar height
const { statusBarheight } = useStatusBarHeight();
const paddingTop = computed(() => {
    return props.headerType === "none"
        ? '0px' 
        : statusBarheight.toString() + 'px'
});


// 设置 background 颜色
const backgroundStyle: Record<string, string> = {
    none: 'bg-transparent',
    default: 'bg-background',
    modern: 'bg-gradient-to-b from-[#E6EBF8] to-[#F5F9FC]'
}


const goBack = () => uni.navigateBack();
</script>

<template>
    <view 
        class="w-screen h-screen flex flex-col fixed"
        :class="backgroundStyle[props.backgroundStyle]"
        :style="{ paddingTop: paddingTop }"
    >
        <!-- nav bar -->
        <view
            v-if="props.headerType === 'nav'"
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
                paddingLeft: props.paddingX + 'px',
                paddingRight: props.paddingX + 'px',
            }"
        >
            <slot />
        </view>
    </view>
</template>