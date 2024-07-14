<script setup lang="ts">
import { ref, withDefaults } from 'vue';
// static
import icons from '@/constants/icons';


interface Props {
    mode?: "selector" | "time" | "date" | "multiSelector" | "region"
    value: number | string | Date;
    range?: any[];
    start?: any;
    end?: any;
    fieldName?: string;
    placeholder?: string;
    icon?: string;
    variant?: "primary" | "mini";
}
const props = withDefaults(defineProps<Props>(), {
    mode: "selector",
    variant: "primary"
});


const variants = {
    primary: "w-full h-[60px] border border-solid border-[#E0E0E0] rounded-2xl bg-white",
    mini: "h-[36px] bg-secondary rounded-full text-secondary-foreground text-sm"
}


// 自定义的 picker onChange 事件
const hasSelected = ref(false); // picker 是否被选择过，控制 placeholder 的显示
const emit = defineEmits(['change']);
function emitChange(e: Event) {
    // 非普通 selector 模式下，直接返回 value
    if (props.mode !== 'selector' ) {
        // @ts-expect-error uniapp 没有标注 Event 类型
        return emit('change', {value: e.detail.value});
    }
    
    emit('change', hasSelected.value
        // @ts-expect-error uniapp 没有标注 Event 类型
        ? {value: Number(e.detail.value)} 
        // @ts-expect-error uniapp 没有标注 Event 类型
        : {value: Number(e.detail.value), hasSelected: props.fieldName}
    );
    hasSelected.value = true; // 如果 picker 被选择过，placeholder 就不再显示
}


// 显示错误信息
const errorMessage = ref('');
const showError = (message: string) => {
    errorMessage.value = message;
};


defineExpose({ showError, hasSelected });
</script>

<template>
    <view
        class="flex items-center justify-between pl-4 relative"
        :class="[
            errorMessage ? '!border-destructive' : '',
            variants[props.variant]
        ]"
    >
        <view class="flex-1 h-full flex items-center gap-3">
            <image v-if="props.icon" :src="props.icon" class="size-6" />
            <picker
                class="flex-1 h-full"
                :mode="props.mode"
                :value="props.value"
                :range="props.range"
                :start="props.start"
                :end="props.end"
                @change="emitChange"
            >
                <!-- 有模拟 placeholder -->
                <view 
                    v-if="placeholder && !hasSelected" 
                    class="size-full"
                >
                    <text
                        class="text-secondary-foreground"
                        :class="[
                            props.variant === 'primary' && 'leading-[58px]',
                            props.variant === 'mini' && 'leading-[36px] mr-8'
                        ]"
                    >
                        {{ placeholder }}
                    </text>
                </view>
                <!-- 直接显示 -->
                <view v-else class="size-full">
                    <text :class="[
                        props.variant === 'primary' && 'leading-[58px]',
                        props.variant === 'mini' && 'leading-[36px] mr-8'
                    ]">
                        {{ 
                            props.range 
                            ? props.range[props.value as number] 
                            : props.value
                        }}
                    </text>
                </view>
            </picker>
        </view>

        <view 
            class="pointer-events-none absolute overflow-hidden top-1/2 -translate-y-1/2 right-3"
            :class="[
                props.variant === 'primary' && 'size-6',
                props.variant === 'mini' && 'size-4'
            ]"
        >
            <image :src="icons.down" class="size-full" />
        </view>
    </view>
    <text v-if="errorMessage" class="text-destructive text-xs mt-2">
        {{ errorMessage }}
    </text>
</template>
