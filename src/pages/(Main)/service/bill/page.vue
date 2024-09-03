<script setup lang="ts">
import { ref, computed } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusError from '@/components/cus-error.vue';
import billItem from './_components/bill-item.vue';
import noBill from './_components/no-bill.vue';
import spinner from '@/components/spinner.vue';
// utils
import {
    startOfDay, endOfDay,
    startOfWeek, endOfWeek,
    startOfMonth, endOfMonth,
    format
} from 'date-fns';
// hooks
import useFetchBill from '@/hooks/useFetchBill';


const current = ref(1);
const now = new Date();

function formateAsYYYYMMDD(time: Date) {
    return format(time, "yyyy-MM-dd");
}

const timeList = ref([
    {
        name: "今日",
        range: {
            timeFrom: formateAsYYYYMMDD(startOfDay(now)),
            timeTo: formateAsYYYYMMDD(endOfDay(now))
        }
    },
    {
        name: "本周",
        range: {
            timeFrom: formateAsYYYYMMDD(startOfWeek(now)),
            timeTo: formateAsYYYYMMDD(endOfWeek(now))
        }
    },
    {
        name: "本月",
        range: {
            timeFrom: formateAsYYYYMMDD(startOfMonth(now)),
            timeTo: formateAsYYYYMMDD(endOfMonth(now))
        }
    },
]);
const currentRange = computed(() => timeList.value[current.value].range);


const {
    bill,
    isFetching,
    error,
    // isLoadComplete,
} = useFetchBill(currentRange);
</script>

<template>
    <cusPage
        header-type="nav"
        padding-x="16"
    >
        <view class="mb-4 flex flex-col gap-y-2">
            <text class="text-3xl font-bold">我的账单</text>
            <up-subsection
                :list="timeList"
                :current="current"
                mode="subsection"
                activeColor="#5b6ff4"
                inactiveColor="#838383"
                @change="(index: number) => current = index"
            />
        </view>

        <scroll-view
            scroll-y
            class="overflow-hidden w-full flex-1"
        >
            <view
                v-if="isFetching"
                class="w-full h-12 flex items-center justify-center"
            >
                <spinner size="medium">
                    <text class="text-sm text-secondary-foreground">
                        加载中
                    </text>
                </spinner>
            </view>

            <cus-error v-else-if="error" />

            <no-bill v-else-if="bill.length === 0" />

            <bill-item
                v-else
                v-for="item, index in bill"
                :key="index"
                :bill="item"
            />
            <!-- 占位 -->
            <view class="h-6"></view>
        </scroll-view>
    </cusPage>
</template>
