<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// components
import spinner from '@/components/spinner.vue';
import modifyEcardPwd from '../../me/modify/_components/modify-ecard-pwd.vue';
// link official
import { getBalance } from '@/utils/link-official';
// stores
import useUserInfo from '@/stores/user-info';
// static
import icons from '@/constants/icons';
import images from '@/constants/images';


const userInfoStore = useUserInfo();


const expenses = ref("--");
const isQuerying = ref(false);
async function fetchConsume() {
    if (!userInfoStore.cardPwd) {
        return;
    }

    // 查询范围 - 本月（本月 1 日 至今, YYYY-MM-DD）
    const timeFrom = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const timeTo = new Date().toISOString().split('T')[0];

    isQuerying.value = true;

    const data = await getBalance({ timeFrom, timeTo });
    if (data) {
        expenses.value = (data.expenses / 100).toString();
    }

    isQuerying.value = false;
}

onMounted(() => {
    fetchConsume();
});
watch(() => userInfoStore.cardPwd, () => {
    fetchConsume();
});



const isModifyEcardPwdPopupShow = ref(false);
function onClose() {
    isModifyEcardPwdPopupShow.value = false;
}


function consumeCardOnClick() {
    // 判断是否绑定一卡通密码
    if (!userInfoStore.cardPwd) {
        isModifyEcardPwdPopupShow.value = true;
    }
}



function goToBill() {
    uni.navigateTo({
        url: '/pages/(Main)/service/bill/page'
    });
}
</script>

<template>
    <view 
        class="relative w-full h-[172px] bg-[#18B453] rounded-2xl shadow-md shadow-[#18B453] px-4 py-5"
        @click="consumeCardOnClick"    
    >
        <view class="w-full flex items-center justify-between">
            <text class="text-white text-opacity-90 text-sm leading-none">
                本月消费
            </text>
            <view
                v-if="userInfoStore.cardPwd"
                class="flex items-center"
                @click="goToBill"
            >
                <text class="text-white text-opacity-90 text-sm leading-none">
                    账单
                </text>
                <image :src="icons.rightWhite" class="size-4" />
            </view>
        </view>
        
        <view class="mt-3">
            <!-- 绑定一卡通密码 -->
            <view 
                v-if="!userInfoStore.cardPwd"
                class="flex items-center"
            >
                <view class="text-white font-bold">去绑定一卡通</view>
                <image class="size-4" :src="icons.rightWhite" />
            </view>

            <spinner
                v-else-if="isQuerying"
                size="medium"
                color="white"
            />

            <view v-else>
                <text class="text-white font-bold text-4xl">
                    {{ expenses }}
                </text>
                <text class="text-white text-sm ml-2">元</text>
            </view>
        </view>
        
        <image :src="images.service.card" class="absolute size-[110px] right-0 -bottom-[14px]" />
    </view>

    <up-popup
        :show="isModifyEcardPwdPopupShow"
        mode="bottom"
        :round="16"
        @close="onClose"
        class="z-50 fixed"
    >
        <modify-ecard-pwd :onClose="onClose" />
        <view class="h-[64px]" />
    </up-popup>
</template>
