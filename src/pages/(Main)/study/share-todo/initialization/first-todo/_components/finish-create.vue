<script setup lang="ts">
import titleDesc from '@/components/title-desc.vue';
import cusButton from '@/components/cus-button.vue';

const emit = defineEmits(['update:current']);
function prevPage() {
    emit('update:current');
}
</script>

<template>
    <view class="w-full h-full flex flex-col">
        <title-desc 
            title="决定好了吗？"
            desc="从这里迈出第一步！"
        />
        <cus-button class="mt-16">
            确定
        </cus-button>
        <cus-button 
            variant="ghost"
            class="mt-4"
            @click="prevPage"
        >
            返回
        </cus-button>
    </view>
</template>
