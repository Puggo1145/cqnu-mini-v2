<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';

import { onLoad } from "@dcloudio/uni-app";
import { ref } from 'vue';


interface DataSource {
    title: string;
    data: SubData[];
}

interface SubData {
    subTitle: string;
    arr: ArrItem[];
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
        <cusPage
            header-type="nav" 
            padding-x="16"
        >
            <scroll-view 
                class="w-full flex-1 overflow-hidden pb-4"
                scroll-y
            >
                <view 
                    v-if="dataSource"
                    class="mt-[32px]" 
                >
                    <view class="title text-2xl font-bold">
                        {{ dataSource.title }}
                    </view>
                        <view 
                            v-for="(item1, index) in dataSource.data" 
                            :key="index" 
                            class="data mt-[24px]"
                        >
                            <text class="font-bold">
                                {{ item1.subTitle }}
                            </text>
                            <view class="mt-4 grid grid-cols-2 grid-rows-2 gap-4">
                                <view
                                    v-for="(item2, index2) in item1.arr" 
                                    :key="item2.name"
                                    class="px-4 py-6 rounded-xl bg-[#E0E0E0] flex flex-col justify-center gap-y-1" 
                                >
                                    <text class="font-bold">
                                        {{ item2.name }}
                                    </text>
                                    <text class="text-sm text-[#899199]">
                                        {{ item2.span }}
                                    </text>
                                </view>
                            </view>
                        </view>
                </view>

            </scroll-view>
        </cusPage>
</template>