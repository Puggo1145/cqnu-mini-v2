<script setup lang="ts">
const emit = defineEmits(['click']);
</script>

<template>
    <view
        class="p-3 bg-white rounded-2xl w-fit"
        @click="emit('click')"
    >
        <slot />
    </view>
</template>
