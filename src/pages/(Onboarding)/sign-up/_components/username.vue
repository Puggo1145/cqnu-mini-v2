<script setup lang="ts">
import { ref } from 'vue';
// components
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
import titleDesc from '@/components/title-desc.vue';
// constants
import { usernameTexts } from '@/constants/signup/signup-texts';
// store
import { useSignupInfo } from '@/stores/signup-info';


const inputValue = ref('');
const inputRef = ref();
const { setUsername } = useSignupInfo();
const handleInput = (event: any) => {
    inputValue.value = event.value;
    inputRef.value.showError('');
    setUsername(inputValue.value);
}


const emit = defineEmits(['update:current']);
const validateValue = () => {
    const valueLength = inputValue.value.length;

    if (valueLength < 2 || valueLength > 6) {
        return inputRef.value.showError('用户名长度必须在 2-6 个字符之间');
    } else if (Number.isInteger(Number(inputValue.value[0]))) {
        return inputRef.value.showError('用户名必须以字母开头');
    }
    
    inputRef.value.showError('');  // 清除错误信息
    emit('update:current');
}
</script>

<template>
    <view class="flex flex-col gap-6">
        <title-desc
            :title="usernameTexts.title" 
            :desc="usernameTexts.desc" 
        />
        <cus-input 
            ref="inputRef"
            field-name="用户名（2-6 字符）"
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