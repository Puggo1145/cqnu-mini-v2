<script setup lang="ts">
// static
import icons from '@/constants/icons';
// types
import type { BillRecord } from '@/utils/link-official/libs/e-card/get-consume';


const { bill } = defineProps<{ bill: BillRecord }>();
</script>

<template>
    <view 
        :class="[
            'box-border flex w-full mt-2 rounded-2xl',
            bill.payIcon === 'alipay' && 'bg-primary',
            bill.payIcon === 'weixin' && 'bg-green-500',
        ]"
    >
        <!-- 消费账单基础信息 -->
        <view class="flex-1 p-4 pl-3 bg-white rounded-2xl flex items-center justify-between">
            <view>
                <text class="text-sm line-clamp-1">{{ bill.resume.split('-')[0] }}</text>
                <text class="mt-1 text-xs text-secondary-foreground">{{ bill.effectdateStr }}</text>
            </view>
            <text class="text-xl font-bold">¥{{ bill.tranamt / 100 }}</text>
        </view>
        <!-- 支付方式 -->
        <view class="w-[56px] flex items-center justify-center rounded-2xl">
            <image
                v-if="bill.payIcon === 'alipay'"
                class="w-6 h-6"
                :src="icons.bill.alipay"
            />
            <image
                v-else-if="bill.payIcon === 'weixin'"
                class="w-6 h-6"
                :src="icons.bill.wxpay"
            />
        </view>
    </view>
</template>
