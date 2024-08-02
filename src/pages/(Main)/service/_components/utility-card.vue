<script setup lang="ts">
import { onMounted } from 'vue';
// stores
import useUserInfo from '@/stores/user-info';
// static
import icons from '@/constants/icons';
import images from '@/constants/images';


const userInfo = useUserInfo();

onMounted(() => {

})
</script>

<template>
    <view class="relative w-full h-[172px] bg-primary rounded-2xl shadow-md shadow-primary px-4 py-5">
        <text class="text-white text-opacity-90 text-sm leading-none">
            水电费余额
        </text>
        <view class="mt-3">
            <view v-if="userInfo.dormitory && userInfo.roomId">
                <text class="text-white font-bold text-4xl">
                    17.1
                </text>
                <text class="text-white text-sm -ml-2">
                    元
                </text>
            </view>

            <view 
                v-else 
                class="flex items-center"
            >
                <view class="text-white font-bold">
                    去绑定宿舍信息
                </view>
                <image class="size-4" :src="icons.rightWhite" />
            </view>
        </view>
        <image :src="images.service.utility" class="absolute size-[110px] right-0 -bottom-[14px]" />
    </view>
</template>
