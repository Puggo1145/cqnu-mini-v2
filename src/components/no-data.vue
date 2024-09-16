<script setup lang="ts">
// components
import cusButton from '@/components/cus-button.vue';
import images from '@/constants/images';


interface NoDataProps {
    title: string;
    desc: string;
    action?: () => void;
    actionText?: string;
    className?: string;
}
const props = defineProps<NoDataProps>();
</script>

<template>
    <view class="w-full flex flex-col items-center justify-center" :class="className">
        <view class="flex flex-col items-center mt-4 gap-y-1">
            <text class="font-bold text-2xl text-secondary-foreground">
                {{ props.title }}
            </text>
            <text class="text-sm text-secondary-foreground">
                {{ props.desc }}
            </text>
        </view>
        <cusButton 
            v-if="props.actionText"
            class="z-50 mt-4" 
            variant="secondary"
            @click="props.action"
        >
            {{ props.actionText }}
        </cusButton>
    </view>
    <image 
        :src="images.NoEasyNote" 
        class="z-0 fixed right-0 -bottom-[30px] w-[220px] h-[180px]" 
    />
</template>
