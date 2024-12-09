<script setup lang="ts">
import { ref } from 'vue';
// components
import bindDormitory from './bind-dormitory.vue';
import spinner from '@/components/spinner.vue';
// stores
import useUserInfo from '@/stores/user-info';
// hooks
import useUtility from '@/hooks/useUtility';
// static
import icons from '@/constants/icons';
import images from '@/constants/images';

interface UtilityCardProps {
    variant?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<UtilityCardProps>(), {
    variant: 'primary'
});

const userInfo = useUserInfo();

const isBindDormitoryPopupShow = ref(false);
function onClose() {
    isBindDormitoryPopupShow.value = false;
}

const { balance, isFetchingBalance } = useUtility();
const currentView = ref<"electricity" | "water">("electricity");
function utilityOnClick() {
    // 判断是否绑定宿舍信息
    if (!userInfo.dormitory || !userInfo.roomNumber) {
        isBindDormitoryPopupShow.value = true;
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
        class="relative w-full h-[172px] rounded-2xl shadow-md px-4 py-5"
        :class="[
            props.variant === 'primary' ? [
                'bg-primary',
                'shadow-primary'
            ] : [
                'bg-primary/90',
                'shadow-primary/60'
            ]
        ]"
        @click="utilityOnClick"
    >
        <view class="w-full flex items-center justify-between">
            <text 
                class="text-white"
                :class="props.variant === 'primary' ? 'text-sm text-opacity-90' : 'text-xs text-opacity-80'"
            >
                {{ currentView === "electricity" ? "电" : "水" }}费余额
            </text>

            <view
                v-if="balance.water"
                class="flex items-center gap-x-1"
            >
                <image 
                    :src="icons.switchWhite" 
                    :class="props.variant === 'primary' ? 'size-4' : 'size-3'"
                />
                <text 
                    class="text-white"
                    :class="props.variant === 'primary' ? 'text-sm text-opacity-90' : 'text-xs text-opacity-80'"
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
                <view class="text-white font-bold">去绑定宿舍信息</view>
                <image class="size-4" :src="icons.rightWhite" />
            </view>

            <!-- 加载中 -->
            <spinner v-else-if="isFetchingBalance" color="white" />

            <!-- 余额 -->
            <view v-else>
                <text class="text-white font-bold text-4xl">
                    {{ currentView === "electricity" ? balance.electricity : balance.water }}
                </text>
                <!-- <text class="text-white text-sm">
                    元
                </text> -->
            </view>
        </view>
        <image :src="images.service.utility" class="absolute size-[110px] right-0 -bottom-[14px]" />
    </view>

    <!-- 绑定宿舍弹出层 -->
    <up-popup
        :show="isBindDormitoryPopupShow"
        mode="bottom"
        :round="16"
        @close="onClose"
        class="z-50 fixed"
    >
        <bind-dormitory :onClose="onClose" />
        <view class="h-[64px]" />
    </up-popup>
</template>
