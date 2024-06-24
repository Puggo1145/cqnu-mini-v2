<script setup lang="ts">
import { ref } from 'vue';
// components
import cusButton from '@/components/cus-button.vue';
import noNote from './no-note.vue';
// static
import icons from '@/constants/icons';

const notes = ref([]);
</script>

<template>
    <view class="mt-8">
        <view class="flex items-center justify-between">
            <text class="text-2xl font-bold">
                课堂小记
            </text>
            <cusButton variant="ghost" class-name="text-secondary-foreground font-normal">
                更多小记
                <image :src="icons.rightSecondary" class="w-5 h-5" />
            </cusButton>
        </view>
        <view>
            <no-note v-if="notes.length === 0" />
        </view>
    </view>
</template>