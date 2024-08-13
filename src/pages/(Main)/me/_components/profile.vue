<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
// store
import useUserInfo from '@/stores/user-info';
// illustration
import { illustrations } from '@/constants/illustrations';


const userInfo = useUserInfo();
const userPublicInfo = computed(() => userInfo.getUserPublicInfo());


const currentImageIndex = ref();
function changeImage(e: any) {
    // 存入缓存
    uni.setStorageSync("currentImageIndex", e.detail.current);
    currentImageIndex.value =  e.detail.current;
}


onMounted(() => {
    // 从缓存读取 Image
    const cachedImageIndex = uni.getStorageSync("currentImageIndex");
    if (cachedImageIndex) currentImageIndex.value = cachedImageIndex;
})
</script>

<template>
    <view class="relative w-full aspect-square bg-[#E5D7CD] 
    rounded-2xl p-6 flex flex-col overflow-hidden">
        <swiper 
            class="size-full absolute left-0 top-0"
            :current="currentImageIndex || 0"
            @change="changeImage"
        >
            <swiper-item
                v-for="(illustration, index) in illustrations"
                :key="index"
                class="size-full"
            >
                <image 
                    :src="illustration" 
                    class="size-full absolute left-0 top-14" 
                />
            </swiper-item>
        </swiper>
        <view class="z-50 relative flex flex-col">
            <text class="text-2xl font-bold leading-[24px]">
                {{ userPublicInfo.username }}
            </text>
            <view class="mt-2 flex line-clamp-1 gap-x-1">
                <text class="text-sm text-secondary-foreground">
                    {{ userPublicInfo.faculty }} ｜
                </text>
                <text class="text-sm text-secondary-foreground">
                    {{ userPublicInfo.grade }} 级 ｜
                </text>
                <text class="text-sm text-secondary-foreground">
                    {{ userPublicInfo.stuClass }}
                </text>
            </view>
            <text
                v-if="currentImageIndex === undefined"
                class="text-sm text-secondary-foreground"
            >
                向左滑动更换我的形象
            </text>
        </view>
    </view>
    <!-- <view class="w-full flex flex-col gap-y-3 mt-3 bg-white p-4 rounded-2xl">
        <text class="text-sm font-bold">
            在想什么？
        </text>
    </view> -->
</template>
