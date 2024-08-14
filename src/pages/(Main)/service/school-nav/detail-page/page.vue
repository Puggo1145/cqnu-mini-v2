<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';

import { onLoad } from "@dcloudio/uni-app";
import { ref } from 'vue';

// constants
import { navs } from '@/constants/school-nav-locations';


interface DataSource {
    title: string;
    data: SubData[];
}

interface SubData {
    subTitle: string;
    places: ArrItem[];
}

interface ArrItem {
    name: string;
    alias: string;
    location: string;
}


const dataSource = ref<DataSource | undefined >(undefined);

onLoad((option) => {
    let tag = option?.dataSource;
    dataSource.value = navs[tag];
})

const handleGoMap = (nav: ArrItem) => {
    const [longitude, latitude] = nav.location.split(",");
    uni.openLocation({
        latitude: Number(latitude),
        longitude: Number(longitude),
        scale: 18,
        name: nav.name,
        address: nav.alias,
    })
}
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
                                    v-for="(item2) in item1.places" 
                                    :key="item2.name"
                                    class="px-4 py-6 rounded-xl bg-[#E0E0E0] flex flex-col justify-center gap-y-1" 
                                    @click="handleGoMap(item2)"
                                >
                                    <text class="font-bold">
                                        {{ item2.name }}
                                    </text>
                                    <text class="text-sm text-[#899199]">
                                        {{ item2.alias }}
                                    </text>
                                </view>
                            </view>
                        </view>
                </view>

            </scroll-view>
        </cusPage>
</template>