<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';
// images
import images from '@/constants/images'

const navCategories = [
    { 
        name: '教学楼',
        desc: "轻松找到教学楼，上课再也不迷路",
        color: "#73bfd2",
        img: images.service.nav.building,
        dataSource: "building"
    },
    { 
        name: '快递', 
        desc: "顺丰快递怎么在校外！",
        color: "#d4b07c",
        img: images.service.nav.express,
        dataSource: "express",
    },
    { 
        name: '商铺',
        desc: "校内美食/小吃/奶茶/超市，都在这里了",
        color: "#df7d4e",
        img: images.service.nav.shop,
        dataSource: "shop",
    },
    // { 
    //     name: '校园美景',
    //     desc: "最美的风景就在眼前",
    //     color: "#daa39e",
    //     img: images.service.nav.scenery,
    //     dataSource: "scenery",
    // },
]


const handleToDetailPage = (dataSource: string) => {
    const targetPage = dataSource === 'scenery' ? 'school-scenery' : 'detail-page'
    // console.log(dataSource);

    uni.navigateTo({
        url: `/pages/(Main)/service/school-nav/${targetPage}/page?dataSource=${dataSource}`
    })
}
</script>


<template>
    <cus-page header-type="nav" padding-x="16">
        <title-desc
            title="需要去哪里？"
            desc="从下方选择地点类型"
            class="mt-8"
        />
        <view class="mt-4 grid grid-cols-2 grid-rows-2 gap-4">
            <view 
                v-for="(item, index) in navCategories" 
                :key="index"
                class="relative overflow-hidden h-[216px] px-5 py-6 flex flex-col gap-y-1 rounded-2xl"
                :style="{ backgroundColor: item.color }"
                @click="handleToDetailPage(item.dataSource)"
            >
                <text class="text-xl font-bold text-white">
                    {{ item.name }}
                </text>
                <text class="text-sm text-white">
                    {{ item.desc }}
                </text>
                <view class="absolute w-[90%] aspect-square -right-4 -bottom-8">
                    <image 
                        class="w-full h-full"
                        :src="item.img"
                    />
                </view>
            </view>
        </view>

        <!-- <view>
            <image 
                class="w-full h-[124px]" 
                :src="images.service.serviceNeedFunction" 
            />
        </view> -->
    </cus-page>
</template>


