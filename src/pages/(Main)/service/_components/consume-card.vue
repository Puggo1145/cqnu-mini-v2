<script setup lang="ts">
import { onMounted } from 'vue';
// stores
import useUserInfo from '@/stores/user-info';
// static
// import icons from '@/constants/icons';
import images from '@/constants/images';


// const userInfo = useUserInfo();

onMounted(() => {

})
</script>

<template>
    <view class="relative w-full h-[172px] bg-[#18B453] rounded-2xl shadow-md shadow-[#18B453] px-4 py-5">
        <text class="text-white text-opacity-90 text-sm">
            本月在校消费
        </text>
        <view class="mt-3">
            <text class="text-white font-bold text-4xl">
                123
            </text>
            <text class="text-white text-sm -ml-2">元</text>
        </view>
        <image :src="images.service.card" class="absolute size-[110px] right-0 -bottom-[14px]" />
    </view>
</template>
