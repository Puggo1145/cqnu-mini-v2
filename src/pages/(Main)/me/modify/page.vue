<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';
import modifyText from './_components/modify-text.vue';
import modifyPassword from './_components/modify-password.vue';
import modifyEcardPwd from './_components/modify-ecard-pwd.vue';
import modifyDormitory from './_components/modify-dormitory.vue';
// store
import useUserInfo from '@/stores/user-info';
// static
import icons from '@/constants/icons';


const userInfoStore = useUserInfo();


type ModifyView = "username" | "dormitory" | "linker" | "ecardPwd";
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
            <!-- 宿舍信息 -->
            <view class="mt-4 w-full p-4 py-6 bg-secondary rounded-2xl flex flex-col gap-y-4">
                <view class="flex items-center justify-between">
                    <modify-text>宿舍楼</modify-text>
                    <text>{{ userInfoStore.dormitory }}</text>
                </view>
                <view class="flex items-center justify-between">
                    <modify-text>房间号</modify-text>
                    <text>{{ userInfoStore.roomNumber }}</text>
                </view>
                <cus-button
                    variant="ghost"
                    @click="() => chooseModifyView('dormitory')"
                >
                    修改宿舍信息
                </cus-button>
            </view>

            <!-- 校园门户密码 -->
            <view 
                class="mt-4 w-full p-4 py-6 bg-secondary rounded-2xl flex items-center justify-between"
                @click="() => chooseModifyView('linker')"
            >
                <modify-text>校园门户密码</modify-text>
                <image :src="icons.rightSecondary" class="size-6" />
            </view>

            <!-- 一卡通密码 -->
            <view 
                class="mt-4 w-full p-4 py-6 bg-secondary rounded-2xl flex items-center justify-between"
                @click="() => chooseModifyView('ecardPwd')"
            >
                <modify-text>一卡通密码</modify-text>
                <image :src="icons.rightSecondary" class="size-6" />
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
        <modify-dormitory
            v-if="currentModifyView === 'dormitory'"
            :on-close="onClose"
        />
        <modify-password
            v-if="currentModifyView === 'linker'"
            :on-close="onClose"
        />
        <modify-ecard-pwd
            v-if="currentModifyView === 'ecardPwd'"
            :on-close="onClose"
        />

        <!-- 占位 -->
        <view class="h-[64px]" />
    </up-popup>
</template>
