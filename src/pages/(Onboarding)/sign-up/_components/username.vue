<script setup lang="ts">
// components
import cusInput from '@/components/cus-input.vue';
import signupTexts from '../_components/signup-texts.vue';
import cusButton from '@/components/cus-button.vue';
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts title="让我们相互认识一下" desc="告诉我你想叫什么名字？你不必使用你的真实姓名" />
        <cus-input field-name="用户名" />
        <cus-button variant="muted">
            继续
        </cus-button>
    </view>
</template>