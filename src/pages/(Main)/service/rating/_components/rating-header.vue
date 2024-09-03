<script setup lang="ts">
// static
import icons from '@/constants/icons';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
</script>

<template>
    <view class="flex items-center gap-x-3 mt-4">
        <cus-input
            :icon="icons.search"
            class="flex-1"
            placeholder="推荐食物名称"
        />
        <cus-button
            variant="secondary"
        >
            <text class="text-primary">
                创建评分
            </text>
        </cus-button>
    </view>
</template>
