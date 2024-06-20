<script setup lang="ts">
import { computed } from 'vue';
import { useSignupInfo } from '@/stores/signup-info';

interface Props {
    current: number;
}
const props = defineProps<Props>();

const stores = useSignupInfo();
const campusInfoMap = computed(() => [
    { label: '学号', value: stores.studentId },
    { label: '身份', value: stores.identity },
    { label: '学院', value: stores.faculty },
    { label: '专业', value: stores.major },
])
const identityMap: Record<number, string> = {
    0: '本科生', 
    1: '研究生'
};
</script>

<template>
    <view 
        class="overflow-hidden w-full h-[180px] flex justify-center pt-4 transition-all duration-500"
        :class="props.current === 3 && 'h-[360px]'"
    >
        <view 
            class="w-[240px] h-[320px] bg-[#F2ECE8] rounded-2xl flex flex-col items-center py-5 px-4 gap-4 
            transition-all duration-500"
            :class="[
                props.current === 0 && 'mt-0',
                props.current === 1 && '-mt-24',
                props.current === 2 && '-mt-40',
                props.current === 3 && 'mt-0',
            ]"
        >
            <view class="flex flex-col gap-3 items-center">
                <view class="size-[64px] rounded-full bg-[#E5D7CD]"></view>
                <text class="max-w-[110px] font-bold h-[16px] leading-[16px] line-clamp-1">
                    {{ stores.username }}
                </text>
            </view>
            <view class="flex flex-col gap-2 w-full px-4">
                <view 
                    class="w-[180px] flex items-center gap-2 leading-[16px]"
                    v-for="item in campusInfoMap"
                    :key="item.label"   
                >
                    <text class="font-bold text-[#333333] text-sm">
                        {{ item.label }}:
                    </text>
                    <text class="flex-1 font-bold text-[#333333] text-sm line-clamp-1">
                        {{ item.label === '身份' ? identityMap[item.value as number] : item.value }}
                    </text>
                </view>
            </view>
            <view class="px-4 py-2 bg-[#E5D7CD] rounded-full text-[#AB9D93] text-sm font-bold">
                {{ stores.password ? '已绑定到官网' : '未绑定到官网' }}
            </view>
        </view>
    </view>
</template>