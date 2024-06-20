<script setup lang="ts">
import { ref, watch, type ButtonHTMLAttributes, type InputTypeHTMLAttribute } from 'vue';

interface Props {
    fieldName?: string;
    value?: string | undefined | null;
    disabled?: boolean;
    type?: InputTypeHTMLAttribute;
}
const props = defineProps<Props>();


const isInputFocused = ref(false);
const inputValue = ref('');
const errorMessage = ref('');


const emit = defineEmits(['focus', 'blur', 'input']);
const onFocus = () => {
    isInputFocused.value = true;
};
const onInput = (e: Event) => {
    // @ts-expect-error uniapp 没有标注 Event 类型
    inputValue.value = e.detail.value
    emit('input', { value: inputValue.value })
};
const onBlur = () => inputValue.value.length === 0 && (isInputFocused.value = false)


// 显示错误信息
const showError = (message: string) => {
    errorMessage.value = message;
};
defineExpose({ showError });


watch(() => props.value, (value) => {
    if (value === undefined) return;

    inputValue.value = value || '';
    if (inputValue.value) {
        isInputFocused.value = true;
    }
});
</script>

<template>
    <view 
        class="w-full h-[60px] border border-solid
        rounded-2xl bg-white flex flex-col relative" 
        :class="[
            isInputFocused ? 'border-secondary-foreground' : 'border-[#E0E0E0]',
            errorMessage && '!border-destructive',
            props.disabled && 'border-[#E0E0E0] bg-[#F5F5F5]'
        ]"
        @click="onFocus"
    >
        <text :class="[
            'absolute left-4 top-5 text-md text-secondary-foreground transition-all', 
            isInputFocused ? 'top-[12px] text-xs leading-[12px]' : 'leading-[16px]' 
        ]">
            {{ props.fieldName }}
        </text>
        <input 
            class="box-border w-full h-full absolute px-4 pt-4"
            :type="props.type ?? 'text'" 
            :value="props.value"
            :disabled="props.disabled"
            @blur="onBlur"
            @input="onInput"
        />
    </view>
    <text v-if="errorMessage" class="text-destructive text-xs mt-2">
        {{ errorMessage }}
    </text>
</template>