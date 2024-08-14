<script setup lang="ts">
// 用户初次进入新版本小程序时弹出的提示框
import { ref, onMounted } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusButton from '@/components/cus-button.vue';
// constants
import { initialPopupInfo } from '@/constants/initial-popup-info';
// static
import images from '@/constants/images';


const showPopup = ref(false);
function onClose() {
    showPopup.value = false;
    uni.setStorageSync('isInitialInfoShowed', true);
}

onMounted(() => {
    const isInitialInfoShowed = uni.getStorageSync('isInitialInfoShowed');
    if (!isInitialInfoShowed) {
        showPopup.value = true;
    }
})
</script>

<template>
    <up-popup
        :show="showPopup"
        @close="onClose"
    >
        <view class="relative pt-[64px] px-4">
            <image :src="images.welcomeOnboard" class="absolute -top-[164px] right-4 w-[300px]" />
            <title-desc
                :title="initialPopupInfo.title"
                :desc="initialPopupInfo.desc"
            />
            <cus-button 
                @click="onClose"
                class-name="mt-8"
            >
                我知道了
            </cus-button>
        </view>
    </up-popup>
</template>
