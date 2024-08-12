<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';
import modifyUsername from '../_components/modify-username.vue';
import bindDormitory from '../../service/_components/bind-dormitory.vue';
// store
import useUserInfo from '@/stores/user-info';
// static
import icons from '@/constants/icons';


const userInfoStore = useUserInfo();


type ModifyView = "username" | "dormitory";
const currentModifyView = ref<ModifyView>();
function chooseModifyView(view: ModifyView) {
    currentModifyView.value = view;
    doesModifyPopupShow.value = true;
}

const doesModifyPopupShow = ref(false);
function onClose() {
    doesModifyPopupShow.value = false;
}
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <scroll-view
            scroll-y
            class="overflow-hidden flex-1"
        >
            <view class="w-full p-4 py-6 flex items-center justify-between bg-white rounded-2xl">
                <text class="text-sm text-secondary-foreground">用户名</text>
                <view 
                    class="flex items-center"
                    @click="() => chooseModifyView('username')"
                >
                    <text>{{ userInfoStore.username }}</text>
                    <image :src="icons.rightSecondary" class="size-6" />
                </view>
            </view>
            <view class="mt-4 w-full p-4 pt-6 flex flex-col bg-white rounded-2xl gap-y-4">
                <view class="flex items-center justify-between">
                    <text class="text-sm text-secondary-foreground">宿舍楼</text>
                    <text>{{ userInfoStore.dormitory }}</text>
                </view>
                <view class="flex items-center justify-between">
                    <text class="text-sm text-secondary-foreground">房间号</text>
                    <text>{{ userInfoStore.roomNumber }}</text>
                </view>
                <cus-button
                    variant="ghost"
                    @click="() => chooseModifyView('dormitory')"
                >
                    修改宿舍信息
                </cus-button>
            </view>
        </scroll-view>

    </cus-page>
    <!-- 修改弹出层 -->
    <up-popup
        :show="doesModifyPopupShow"
        mode="bottom"
        :round="16"
        @close="onClose"
    >
        <modify-username
            v-if="currentModifyView === 'username'"
            :on-close="onClose"
        />
        <bind-dormitory
            v-if="currentModifyView === 'dormitory'"
            :on-close="onClose"
        />
        <!-- 占位 -->
        <view class="h-[64px]" />
    </up-popup>
</template>
