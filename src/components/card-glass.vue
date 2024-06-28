<script setup lang="ts">
interface CardGlassProps {
    size: "small" | "medium" | "wide";
    title: string;
    desc?: string;
    img?: string;
    clipContent?: boolean; // 是否裁剪超出卡片的部分
}

const props = defineProps<CardGlassProps>();

const cardSize: Record<string, string> = {
    small: "h-[89px] px-4 pt-6",
    medium: "h-[192px] px-4 py-5",
    wide: "w-full h-[124px]",
}
const imgSize: Record<string, string> = {
    small: "size-[96px] -right-1 -bottom-6",
    medium: "size-[148px] -right-2 -bottom-6",
    wide: "w-[120px] h-[120px]", // TODO - 适配 wide 下的图片大小
}
</script>

<template>
    <view 
        class="relative bg-white rounded-2xl" 
        :class="[
            cardSize[props.size],
            props.clipContent && 'overflow-hidden',
        ]"
    >
        <view class="flex flex-col">
            <text 
                :class="props.size === 'small' ? 'text-md' : 'text-2xl'"
                class="text-modern font-bold leading-none"
            >
                {{ props.title }}
            </text>
            <text class="text-xs text-modern-secondary mt-1">
                {{ props.desc }}
            </text>
        </view>
        <image 
            :src="props.img" 
            class="absolute"
            :class="imgSize[props.size]" 
        />
    </view>
</template>
