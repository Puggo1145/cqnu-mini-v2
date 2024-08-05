<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';
// images
import images from '@/constants/images'

const list = [
    { name: '教学楼', img: images.service.serviceSchoolNav },
    { name: '快递', img: images.service.serviceExpressNav },
    { name: '商铺', img: images.service.serviceShopNav },
    { name: '校园美景', img: images.service.serviceSceneryNav },
]

const data = [
        { 
            title: '教学楼', 
            data: [
                { 
                    subTitle: '', 
                    arr: [
                        { name: '弘德楼', span: '11/12/13/14/15' },
                        { name: '特教楼', span: 'T' },
                        { name: '致用楼', span: '' },
                        { name: '图北楼', span: '17' },
                    ]
                }
            ]
        },
        {
            title: '快递',
            data: [
                { 
                    subTitle: '', 
                    arr: [
                        { name: '京东快递', span: 'XXX' },
                        { name: '顺丰快递', span: 'XXX' },
                        { name: '三食堂菜鸟驿站', span: '三食堂' },
                        { name: 'XXX菜鸟驿站', span: 'XXX' },
                    ]
                }
            ]
        },
        {
            title: '商铺',
            data: [
                { 
                    subTitle: '奶茶', 
                    arr: [
                        { name: '茶百道', span: '南门商业街' },
                        { name: '蜜雪冰城', span: '二食堂二楼' },
                        { name: 'XXX', span: '三食堂XXX' },
                    ]
                },{
                    subTitle: '超市',
                    arr: [
                        { name: '琳琅铺子', span: '南门商业街' },
                        { name: 'XXX', span: 'XXXX' },
                        { name: 'XXX', span: '三食堂XXX' },
                    ]
                },{
                    subTitle: '美食小吃',
                    arr: [
                        { name: '琳琅铺子', span: '南门商业街' },
                        { name: 'XXX', span: 'XXXX' },
                        { name: 'XXX', span: '三食堂XXX' },
                        { name: '琳琅铺子', span: '南门商业街' },
                        { name: 'XXX', span: 'XXXX' },
                        { name: 'XXX', span: '三食堂XXX' },
                        { name: '琳琅铺子', span: '南门商业街' },
                        { name: 'XXX', span: 'XXXX' },
                        { name: 'XXX', span: '三食堂XXX' },
                    ]
                }
            ]
        },
        {
            title: '校园美景',
            top5: [
                { name: '情人坡', span: 'XXX', desc: '每个重师人的共同的回忆' },
                { name: '泛月桥', span: 'XXX', desc: '一段 description' },
                { name: '特教楼', span: 'XXX', desc: '一段 description' },
                { name: '梧桐树', span: 'XXX', desc: '一段 description' },
                { name: '我的寝室', span: 'XXX', desc: '这个无须多言' }, 
            ],
            all: [
                { name: '情人坡', span: 'XXX', desc: '一段 description' },
                { name: '泛月桥', span: 'XXX', desc: '一段 description' },
                { name: '特教楼', span: 'XXX', desc: '一段 description' },
                { name: '梧桐树', span: 'XXX', desc: '一段 description' },
                { name: '我的寝室', span: 'XXX', desc: '一段 description' }, 
                { name: '情人坡', span: 'XXX', desc: '每个重师人的共同的回忆' },
                { name: '泛月桥', span: 'XXX', desc: '一段 description' },
                { name: '特教楼', span: 'XXX', desc: '一段 description' },
                { name: '梧桐树', span: 'XXX', desc: '一段 description' },
                { name: '我的寝室', span: 'XXX', desc: '这个无须多言' }, 
            ]
        }
]


const handleToDetailPage = (index: number) => {
    console.log(data[index]);
    if (data[index].title === '校园美景') {
        uni.navigateTo({
            url: '/pages/(Main)/service/school-nav/school-scenery/page?dataSource=' + JSON.stringify(data[index])
        })
    }else {
        uni.navigateTo({
            url: '/pages/(Main)/service/school-nav/detail-page/page?dataSource=' + JSON.stringify(data[index])
        })
    }
    
}


</script>


<template>
    <view>
        <cus-page
            header-type="nav" 
            padding-x="16"
        >
        <title-desc
            title="需要去哪里？"
            desc="从下方选择地点类型"
            class=" mt-5 "
        />

        <view class=" flex flex-wrap justify-between mt-5">
            <view @click="handleToDetailPage(index)" v-for="(item, index) in list" :key="item.name" class=" mb-2">
                <image class=" w-[190px] h-[216px]" :src="item.img"/>
            </view>
        </view>

        <view>
            <image class=" w-full h-[124px]" :src="images.service.serviceNeedFunction"/>
        </view>
            
        </cus-page>
    </view>
</template>


