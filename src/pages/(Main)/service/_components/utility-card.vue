<script setup lang="ts">
import { ref } from 'vue';
// components
import modifyDormitory from '@/pages/(Main)/me/modify/_components/modify-dormitory.vue';
import spinner from '@/components/spinner.vue';
// stores
import useUserInfo from '@/stores/user-info';
// hooks
import useUtility from '@/hooks/useUtility';
// static
import icons from '@/constants/icons';

const userInfo = useUserInfo();

const isModifyDormitoryPopupShow = ref(false);
function onClose() {
    isModifyDormitoryPopupShow.value = false;
}

const { balance, isFetchingBalance } = useUtility();
const currentView = ref<"electricity" | "water">("electricity");
function utilityOnClick() {
    // 判断是否绑定宿舍信息
    if (!userInfo.dormitory || !userInfo.roomNumber) {
        isModifyDormitoryPopupShow.value = true;
        return;
    }

    // 是否存在水费
    if (!balance.value.water) {
        return;
    }

    currentView.value = currentView.value === "electricity" ? "water" : "electricity";
}
</script>

<template>
    <view
        class="relative w-full h-[172px] rounded-2xl px-4 py-5 bg-secondary"
        @click="utilityOnClick"
    >
        <view class="w-full flex items-center justify-between">
            <text
                class="text-secondary-foreground"
                :class="'text-sm text-opacity-90'"
            >
                {{ currentView === "electricity" ? "电" : "水" }}费余额
            </text>

            <view
                v-if="balance.water"
                class="flex items-center gap-x-1"
            >
                <image
                    :src="icons.switchWhite"
                    class="size-4"
                />
                <text
                    class="text-secondary-foreground"
                    :class="'text-sm text-opacity-90'"
                >
                    切换
                </text>
            </view>
        </view>

        <view class="mt-3">
            <!-- 绑定宿舍信息 -->
            <view
                v-if="!userInfo.dormitory && !userInfo.roomNumber"
                class="flex items-center"
            >
                <view class="text-secondary-foreground font-bold">去绑定宿舍信息</view>
                <image
                    class="size-4"
                    :src="icons.rightSecondary"
                />
            </view>

            <!-- 加载中 -->
            <spinner
                v-else-if="isFetchingBalance"
                color="black"
            />

            <!-- 余额 -->
            <view v-else>
                <text class="text-secondary-foreground font-bold text-4xl">
                    {{ currentView === "electricity" ? balance.electricity : balance.water }}
                </text>
            </view>
        </view>
        <view class="absolute left-4 bottom-4 size-8 bg-primary rounded-full 
        flex items-center justify-center">
            <image
                :src="icons.service.utility"
                class="size-4"
            />
        </view>
    </view>

    <!-- 绑定宿舍弹出层 -->
    <up-popup
        :show="isModifyDormitoryPopupShow"
        mode="bottom"
        :round="16"
        @close="onClose"
        class="z-50 fixed"
    >
        <modify-dormitory :onClose="onClose" />
        <view class="h-[64px]" />
    </up-popup>
</template>
