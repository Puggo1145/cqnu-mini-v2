<script setup lang="ts">
// types
import type { Tag } from '@/components/tag-selector.vue';

interface TodoCardProps {
    content: string | null;
    remindDate: string;
    remindTime: string;
    tags: Tag[];
}
const props = defineProps<TodoCardProps>();
</script>

<template>
    <view class="w-full p-4 rounded-2xl flex flex-col gap-y-2 bg-[#F8F1E8]">
        <view 
            class="w-full h-5 rounded-xl"
            :class="!content && 'bg-black/5'"
        >
            <text class="text-xl leading-none font-bold">
                {{ props.content }}
            </text>
        </view>
        <text class="text-sm text-fit-background-lighter">
            {{ props.remindDate }} {{ props.remindTime }}
        </text>
    </view>
</template>
