<script setup lang="ts">
// components
import cardGlass from '@/components/card-glass.vue';
import cardNeedNewFunction from '@/components/card-need-new-function.vue';
// static
import images from '@/constants/images';


const handleToNavPage = () => {
    uni.navigateTo({
        url: '/pages/(Main)/service/school-nav/page'
    })
}
// 跳转到送水微信小程序
const handleToMiniprogram = () => {
    uni.navigateToMiniProgram({
        appId: 'wx600e85d92f102852',
        path: '',
    })
}
</script>

<template>
    <view class="grid gap-[14px] grid-cols-2">
        <card-glass 
            size="medium" 
            title="美食点评" 
            desc="好吃不好吃 大家来点评" 
            :img="images.service.food"
        />
        <view class="flex flex-col gap-y-[14px]">
            <card-glass 
                size="small" 
                title="校园导航" 
                desc="教学楼/快递/商铺" 
                :img="images.service.location"
                @click="handleToNavPage"
                clip-content
            />
            <card-glass 
                size="small" 
                title="送水服务" 
                desc="跳转购水小程序"
                :img="images.service.water"
                @click="handleToMiniprogram"
                clip-content
            />
        </view>
        <view class="col-span-2">
            <card-need-new-function />
        </view>
    </view>
</template>