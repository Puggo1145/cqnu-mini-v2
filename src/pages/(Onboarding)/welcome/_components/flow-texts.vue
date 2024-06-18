<script setup lang="ts">
import flowTexts from '@/constants/flowTexts';
</script>

<template>
    <view class="w-[150%] overflow-hidden gap-4">
        <view 
            v-for="text, index in flowTexts"
            class="w-fit bg-secondary text-secondary-foreground rounded-2xl px-6 py-2 whitespace-nowrap text-center mr-4 mb-4"
            :class="index !== 0 && index / 4 === 0 ? 'block' : 'inline-block'"
            :key="index"
        >
            {{ text }}
        </view>
    </view>
</template>