<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';


import { onLoad } from "@dcloudio/uni-app";
import { ref } from 'vue';

// constants
import { navs } from '@/constants/school-nav-locations';

const dataSource = ref<Object | undefined >(undefined);
onLoad((option) => {
    let tag = option?.dataSource;
    dataSource.value = navs[tag];
})
</script>

<template>
    <cusPage
        header-type="nav" 
        padding-x="16"
    >
        <scroll-view 
            class="w-full flex-1 overflow-hidden pb-5"
            scroll-y
        >
            <view class=" mt-[32px]" v-if="dataSource">
                <view class="title text-3xl font-bold">{{ dataSource.title }}</view>

                <view class="content">

                    <view class="top5 mt-[24px]">
                        <text class=" font-bold text-[22px] ">{{ dataSource.data[0].subTitle }}</text>
                        <scroll-view scroll-x class=" w-full whitespace-nowrap mt-[12px]">
                            <block 
                                v-for="(item, index) in dataSource.data[0].places"
                                :key="index">
                                <view class=" text-white inline-flex mr-[10px] w-[172px] h-[216px] bg-[#D9D9D9] rounded-[16px] overflow-hidden text-ellipsis flex-col justify-end">
                                    <view class=" flex flex-col gap-1" style="padding-bottom: 20px; padding-left: 10px; padding-right: 10px;">
                                        <text class=" text-lg font-bold">{{ item.name }}</text>
                                        <text class=" text-sm font-light mt-auto">{{ item.desc }}</text>
                                    </view>
                                </view>
                            </block>
                        </scroll-view>
                    </view>

                    <view class=" mt-[32px]" v-if="dataSource">
                        <text class="text-[22px] font-bold">全部</text>
                        <view class="content mt-[12px] flex flex-wrap justify-between items-center ">
                            <view 
                                :class="index <= 1 ? '' : ' mt-[16px]' " 
                                class=" p-3 item w-[48%] h-[92px] rounded-xl bg-[#E0E0E0] flex flex-col justify-center gap-2" 
                                v-for="(item, index) in dataSource.data[1].places" 
                                :key="index">
                                <text class=" text-[16px] font-bold">{{ item.name }}</text>
                                <text class=" text-[14px] text-[#899199]">{{ item.alias }}</text>
                            </view>
                        </view>
                    </view>

                </view>
            </view>
        </scroll-view>
    </cusPage>
</template>
