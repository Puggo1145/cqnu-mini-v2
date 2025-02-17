<script setup lang="ts">
import { ref } from 'vue';
// components
import spinner from '@/components/spinner.vue';
import modifyEcardPwd from '../../me/modify/_components/modify-ecard-pwd.vue';
// hooks
import useFetchConsume from '@/hooks/useFetchConsume';
// stores
import useUserInfo from '@/stores/user-info';
// static
import icons from '@/constants/icons';

const userInfoStore = useUserInfo();
const { consume, isFetching, error, fetchConsume } = useFetchConsume();

const isModifyEcardPwdPopupShow = ref(false);
function onClose() {
    isModifyEcardPwdPopupShow.value = false;
}

async function consumeCardOnClick() {
    // 判断是否绑定一卡通密码
    if (!userInfoStore.cardPwd) {
        isModifyEcardPwdPopupShow.value = true;
    } else if (error) {
        await fetchConsume();
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
        class="relative w-full h-[172px] rounded-2xl px-4 py-5 bg-secondary"
        @click="consumeCardOnClick"
    >
        <view class="w-full flex items-center justify-between">
            <text class="text-secondary-foreground text-sm text-opacity-90">
                本月消费
            </text>
            <view
                v-if="userInfoStore.cardPwd"
                class="flex items-center"
                @click.stop="goToBill"
            >
                <text class="text-secondary-foreground leading-none text-sm text-opacity-90">
                    账单
                </text>
                <image
                    :src="icons.rightSecondary"
                    class="size-4"
                />
            </view>
        </view>

        <view class="mt-3">
            <!-- 绑定一卡通密码 -->
            <view
                v-if="!userInfoStore.cardPwd"
                class="flex items-center"
            >
                <view class="text-secondary-foreground font-bold">去绑定一卡通</view>
                <image
                    class="size-4"
                    :src="icons.rightSecondary"
                />
            </view>

            <spinner
                v-else-if="isFetching"
                color="black"
            />

            <text
                v-else-if="error"
                class="text-secondary-foreground font-bold"
            >
                数据获取失败
            </text>

            <view v-else>
                <text class="text-secondary-foreground font-bold text-4xl">
                    {{ consume }}
                </text>
                <text class="text-secondary-foreground/70 text-sm ml-2">元</text>
            </view>
        </view>

        <view class="absolute left-4 bottom-4 size-8 bg-[#18B453] rounded-full 
        flex items-center justify-center">
            <image
                :src="icons.service.ecard"
                class="size-4"
            />
        </view>
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
