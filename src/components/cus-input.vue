<script setup lang="ts">
import { ref, watch, withDefaults, onMounted } from 'vue';
// types
import type { InputTypeHTMLAttribute } from 'vue';
// static
// import icons from '@/constants/icons';

export type CusInputEvent = { value: string };
interface Props {
    fieldName?: string;
    value?: string | undefined | null;
    disabled?: boolean;
    type?: InputTypeHTMLAttribute;
    placeholder?: string;
    icon?: string;
    inputStyle?: string;
}
const props = withDefaults(defineProps<Props>(), {
    type: "text"
});


// input refs
const isInputFocused = ref(false);
const inputValue = ref('');
const errorMessage = ref('');

// input 事件相关
const emit = defineEmits(['focus', 'blur', 'input']);
const onFocus = () => {
    isInputFocused.value = true;
};
const onInput = (e: Event) => {
    // @ts-expect-error uniapp 没有标注 Event 类型
    inputValue.value = e.detail.value;
    emit('input', { value: inputValue.value } as CusInputEvent);
    // 用户输入时清空错误信息
    errorMessage.value = '';
};
const onBlur = () => inputValue.value.length === 0 && (isInputFocused.value = false)

// 显示错误信息
const showError = (message: string) => {
    errorMessage.value = message;
};
defineExpose({ showError });

// input 初始状态表现
onMounted(() => {
    if (props.value) {
        inputValue.value = props.value;
        isInputFocused.value = true;
    }
})

watch(() => props.value, (value) => {
    if (value === undefined) return;

    if (inputValue.value) {
        inputValue.value = value || '';
        isInputFocused.value = true;
    }
});
</script>

<template>
    <view
        :class="[
            'box-border flex items-center w-full h-[60px] border border-solid rounded-2xl bg-secondary',
            isInputFocused ? 'border-secondary-foreground' : 'border-[#E0E0E0]',
            errorMessage && '!border-destructive',
            props.disabled && 'border-[#E0E0E0] bg-[#F5F5F5]',
            inputStyle
        ]"
        @click="onFocus"
    >
        <image
            v-if="props.icon"
            :src="props.icon"
            class="size-6 pl-4"
        />
        <view class="flex-1 h-full flex flex-col relative">
            <text
                v-if="props.fieldName"
                :class="[
                    'absolute left-4 top-5 text-md text-secondary-foreground transition-all',
                    isInputFocused ? 'top-[12px] text-xs leading-[12px]' : 'leading-[16px]'
                ]"
            >
                {{ props.fieldName }}
            </text>
            <input
                class="box-border w-full h-full absolute leading-[58px] px-4 text-sm"
                :class="props.fieldName && 'mt-2'"
                :type="props.type"
                :value="props.value"
                :disabled="props.disabled"
                :placeholder="props.placeholder"
                @blur="onBlur"
                @input="onInput"
            />
        </view>
    </view>

    <text
        v-if="errorMessage"
        class="text-destructive text-xs mt-2"
    >
        {{ errorMessage }}
    </text>
</template>