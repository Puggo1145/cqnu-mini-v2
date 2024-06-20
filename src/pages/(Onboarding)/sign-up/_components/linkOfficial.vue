<script setup lang="ts">
// components
import signupTexts from '../_components/signup-texts.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts title="绑定校园官网" desc="绑定学校官网户账号可以帮助你更好地管理学业信息课表同步、成绩查询及其他学业信息服务都有我来搞定我们尊重您的隐私，因此您可以选择性保存这一信息" />
        <cusInput field-name="学号" />
        <cusInput field-name="官网密码" />
        <cusButton variant="muted">
            绑定
        </cusButton>
        <cusButton variant="outline">
            跳过
        </cusButton>
    </view>
</template>