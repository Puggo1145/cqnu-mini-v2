<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';

import { onLoad } from "@dcloudio/uni-app";
import { ref } from 'vue';


interface DataSource {
    title: string;
    data: Array<SubData>;
}

interface SubData {
    subTitle: string;
    arr: Array<ArrItem>;
}

interface ArrItem {
    name: string;
    span: string;
}


const dataSource = ref<DataSource | undefined >(undefined);

onLoad((option) => {
    dataSource.value = JSON.parse(option?.dataSource) as DataSource;
})
</script>

<template>
    <view>
        <cusPage
            header-type="nav" 
            padding-x="16"
        >
        <scroll-view 
            class="w-full flex-1 overflow-hidden pb-4"
            scroll-y
        >
            <view class=" mt-[32px]" v-if="dataSource">
                <view class="title text-2xl font-bold">{{ dataSource.title }}</view>
                    <view v-for="(item1, index) in dataSource.data" :key="index"  class="data mt-[24px]">
                        <text class=" font-bold">{{ item1.subTitle }}</text>
                        <view class="content mt-[12px] flex flex-wrap justify-between items-center ">
                            <view :class="index2 <= 1 ? '' : ' mt-[16px]' " class=" p-3 item w-[48%] h-[92px] rounded-xl bg-[#E0E0E0] flex flex-col justify-center gap-2" v-for="(item2, index2) in item1.arr" :key="item2.name">
                                <text class=" text-[16px] font-bold">{{ item2.name }}</text>
                                <text class=" text-[14px] text-[#899199]">{{ item2.span }}</text>
                            </view>
                        </view>
                    </view>
            </view>

        </scroll-view>

        </cusPage>
    </view>
</template>