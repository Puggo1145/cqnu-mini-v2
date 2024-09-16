<script setup lang="ts">
const { img } = defineProps < { img: string } > ();
</script>

<template>
    <view class="overflow-hidden size-[80px] rounded-2xl bg-gray-400">
        <image
            :src="img"
            class="size-full"
        />
    </view>
</template>
