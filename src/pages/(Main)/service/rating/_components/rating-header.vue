<script setup lang="ts">
// static
import icons from '@/constants/icons';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';


function gotoCreateItem() {
    uni.navigateTo({
        url: '/pages/(Main)/service/rating/create-item/page'
    });
}
</script>

<template>
    <view class="flex items-center gap-x-3 mt-4 pb-3">
        <cus-input
            :icon="icons.search"
            input-style="!h-[52px]"
            class="flex-1"
            placeholder="推荐食物名称"
        />
        <cus-button
            variant="secondary"
            @click="gotoCreateItem"
        >
            <text class="text-primary">
                创建评分
            </text>
        </cus-button>
    </view>
</template>
