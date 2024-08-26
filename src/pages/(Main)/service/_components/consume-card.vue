<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import spinner from '@/components/spinner.vue';
// link official
import { getBalance } from '@/utils/link-official';
// static
import icons from '@/constants/icons';
import images from '@/constants/images';


const expenses = ref("--");

const isQuerying = ref(false);
onMounted(async () => {
    // 查询范围 - 本月（本月 1 日 至今, YYYY-MM-DD）
    const timeFrom = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const timeTo = new Date().toISOString().split('T')[0];

    isQuerying.value = true;

    const data = await getBalance({ timeFrom, timeTo });
    if (data) {
        expenses.value = (data.expenses / 100).toString();
    }

    isQuerying.value = false;
})


function goToBill() {
    uni.navigateTo({
        url: '/pages/(Main)/service/bill/page'
    });
}
</script>

<template>
    <view class="relative w-full h-[172px] bg-[#18B453] rounded-2xl shadow-md shadow-[#18B453] px-4 py-5">
        <view class="w-full flex items-center justify-between">
            <text class="text-white text-opacity-90 text-sm leading-none">
                本月消费
            </text>
            <view 
                class="flex items-center"
                @click="goToBill"
            >
                <text class="text-white text-opacity-90 text-sm leading-none">
                    账单
                </text>
                <image :src="icons.rightWhite" class="size-4" />
            </view>
        </view>
        <view class="mt-3">
            <spinner 
                v-if="isQuerying"
                size="medium"
                color="white"
            />
            <view v-else>
                <text class="text-white font-bold text-4xl">
                    {{ expenses }}
                </text>
                <text class="text-white text-sm ml-2">元</text>
            </view>
        </view>
        <image :src="images.service.card" class="absolute size-[110px] right-0 -bottom-[14px]" />
    </view>
</template>
