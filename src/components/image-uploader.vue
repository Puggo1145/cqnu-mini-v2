<script setup lang="ts">
import { ref } from 'vue';


interface ImageUploaderProps {
    maxCount: number;
}
const props = defineProps<ImageUploaderProps>();

const selectedImages = ref<string[] | string>();
const emit = defineEmits(['select']);

async function onClick() {
    // 选图
    const res = await uni.chooseImage({
        count: props.maxCount,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
    });

    if (props.maxCount === 1) {
        selectedImages.value = res.tempFilePaths[0];
        emit('select', selectedImages.value);
        return;
    } else {
        selectedImages.value = res.tempFilePaths;
        emit('select', selectedImages.value);
    }
}
</script>

<template>
    <view @click="onClick">
        <slot />
    </view>
</template>
