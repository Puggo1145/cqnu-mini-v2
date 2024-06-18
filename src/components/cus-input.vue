<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    fieldName?: string;
}
const props = defineProps<Props>();

const isInputFocused = ref(false);
const inputValue = ref('');

// @ts-expect-error uniapp 没有标注 Event 类型
const onInput = (e: Event) => inputValue.value = e.detail.value;
const onBlur = () => inputValue.value.length === 0 && (isInputFocused.value = false)
</script>

<template>
    <view 
        class="w-full h-[60px] border border-solid
        rounded-2xl bg-white flex flex-col px-4 relative" 
        :class="isInputFocused ? 'py-3 border-secondary-foreground' : 'py-5 border-[#E0E0E0]'
    ">
        <text :class="[
            'text-md text-secondary-foreground transition-all', 
            isInputFocused ? 'text-xs leading-[12px]' : 'leading-[16px]' 
        ]">
            {{ props.fieldName }}
        </text>
        <input 
            type="text" 
            @focus="isInputFocused = true" 
            @blur="onBlur"
            @input="onInput"
        />
    </view>
</template>
