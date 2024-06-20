<script setup lang="ts">
// components
import signupTexts from './signup-texts.vue';
import cusButton from '@/components/cus-button.vue';

const goToSignUpProcess = () => {
    uni.navigateTo({
        url: '/pages/(Onboarding)/process-sign-up/page'
    });
}
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts 
            title="请核对信息"
            desc="请核对您填写的信息，您当前依然可以返回修改。提交后，您将无法再修改这些信息"
        />
        <cusButton 
            variant="primary"
            @click="goToSignUpProcess"
        >
            确认
        </cusButton>
    </view>
</template>
