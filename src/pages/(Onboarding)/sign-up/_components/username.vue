<script setup lang="ts">
import { ref } from 'vue';
// components
import cusInput from '@/components/cus-input.vue';
import signupTexts from '../_components/signup-texts.vue';
import cusButton from '@/components/cus-button.vue';

interface Props {
    current: number;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:current']);


const inputValue = ref('');
const inputRef = ref();


const handleInput = (event: any) => {
    inputValue.value = event.value;
    inputRef.value.showError('');
}


const validateValue = () => {
    const valueLength = inputValue.value.length;

    if (valueLength < 2 || valueLength > 12) {
        inputRef.value.showError('用户名长度必须在 2-12 个字符之间');
    } else {
        inputRef.value.showError('');  // 清除错误信息
        emit('update:current', props.current + 1);
    }
}
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts title="让我们相互认识一下" desc="给自己取一个喜欢的昵称。你不必使用你的真实姓名" />
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