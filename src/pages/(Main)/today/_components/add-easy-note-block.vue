<script setup lang="ts">
import icons from '@/constants/icons';

function goToCreateEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/create/page',
    });
}
</script>

<template>
    <view
        class="w-full h-[96px] bg-secondary rounded-2xl flex justify-center items-center"
        @click="goToCreateEasyNote"
    >
        <image
            :src="icons.plus"
            class="size-9"
        />
    </view>
</template>
