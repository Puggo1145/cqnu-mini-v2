<script setup lang="ts">
const emit = defineEmits(['click']);
</script>

<template>
    <view 
        class="w-full p-3 pr-6 rounded-2xl flex items-center gap-x-4 bg-white mb-2"
        @click="emit('click')"
    >
        <slot />
    </view>
</template>