<script setup lang="ts">
// componens
import cusButton from '@/components/cus-button.vue';
// static
import icons from '@/constants/icons';
</script>

<template>
    <view class="w-full h-[0px] flex-col items-center justify-between">
        <cus-button variant="ghost">
            <!-- <image :src="icons.syncPrimary" class="size-8" /> -->
            <text>
                同步课表
            </text>
        </cus-button>
    </view>
</template>
