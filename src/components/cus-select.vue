<script setup lang="ts">
import { ref } from 'vue';
// icons
import icons from '@/constants/icons';

interface Props {
    value: number;
    range: any[];
    fieldName: string;
    placeholder?: string;
}
const props = defineProps<Props>();


const hasSelected = ref(false); // picker 是否被选择过，控制 placeholder 的显示
const errorMessage = ref('');


const emit = defineEmits(['change']);
function emitChange(e: Event) {
    emit('change', hasSelected.value 
        // @ts-expect-error uniapp 没有标注 Event 类型
        ? {value: Number(e.detail.value)} 
        // @ts-expect-error uniapp 没有标注 Event 类型
        : {value: Number(e.detail.value), hasSelected: props.fieldName}
    );
    hasSelected.value = true; // 如果 picker 被选择过，placeholder 就不再显示
}


// 显示错误信息
const showError = (message: string) => {
    errorMessage.value = message;
};
defineExpose({ showError, hasSelected });
</script>

<template>
    <view 
        class="w-full h-[60px] border border-solid border-[#E0E0E0]
        rounded-2xl bg-white flex items-center px-4 relative"
        :class="errorMessage ? '!border-destructive' : ''"
    >
        <picker 
            class="flex-1" 
            mode="selector"
            :value="props.value"
            :range="props.range"
            @change="emitChange"
        >
            <view v-if="placeholder && !hasSelected" class="text-secondary-foreground">
                {{ placeholder }}
            </view>
            <view v-else class="w-full" >
                {{ props.range[props.value] }}
            </view>
        </picker>
        <view class="size-6 overflow-hidden">
            <image :src="icons.down" class="size-full" />
        </view>
    </view>
    <text v-if="errorMessage" class="text-destructive text-xs mt-2">
        {{ errorMessage }}
    </text>
</template>
