<script setup lang="ts">
import { ref } from 'vue';
// components
import cusInput from '@/components/cus-input.vue';
import signupTexts from '../_components/signup-texts.vue';
import cusButton from '@/components/cus-button.vue';
// constants
import { usernameTexts } from '@/constants/signup/signup-texts';
// store
import { useSignupInfo } from '@/stores/signup-info';

const { setUsername } = useSignupInfo();

const emit = defineEmits(['update:current']);

const inputValue = ref('');
const inputRef = ref();

const handleInput = (event: any) => {
    inputValue.value = event.value;
    inputRef.value.showError('');
    setUsername(inputValue.value);
}

const validateValue = () => {
    const valueLength = inputValue.value.length;

    if (valueLength < 2 || valueLength > 12) {
        return inputRef.value.showError('用户名长度必须在 2-12 个字符之间');
    } else if (Number.isInteger(Number(inputValue.value[0]))) {
        return inputRef.value.showError('用户名必须以字母开头');
    }
    
    inputRef.value.showError('');  // 清除错误信息
    emit('update:current');
}
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts 
            :title="usernameTexts.title" 
            :desc="usernameTexts.desc" 
        />
        <cus-input 
            ref="inputRef"
            field-name="用户名（2-12 字符）"
            @input="handleInput" 
        />
        <cus-button 
            :variant="inputValue.length > 0 ? 'primary' : 'muted'"
            :disabled="inputValue.length === 0"
            @click="validateValue"
        >
            继续
        </cus-button> 
    </view>
</template>