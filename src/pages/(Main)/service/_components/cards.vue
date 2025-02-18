<script setup lang="ts">
// components
import cardGlass from '@/components/card-glass.vue';
// static
import images from '@/constants/images';

function navigateToNavPage() {
    uni.navigateTo({
        url: '/pages/(Main)/service/school-nav/page'
    })
}
// 跳转到送水微信小程序
function navigateToWater() {
    uni.navigateToMiniProgram({
        appId: 'wx600e85d92f102852',
        path: '',
    })
}

</script>

<template>
    <view class="w-full flex gap-x-[14px]">
        <card-glass
            size="small"
            class="w-full"
            title="校园导航"
            desc="教学楼/快递/商铺"
            :img="images.service.location"
            @click="navigateToNavPage"
            clip-content
        />
        <card-glass
            size="small"
            class="w-full"
            title="送水服务"
            desc="跳转购水小程序"
            :img="images.service.water"
            @click="navigateToWater"
            clip-content
        />
    </view>
</template>