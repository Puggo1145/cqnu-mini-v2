<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
import spinner from '@/components/spinner.vue';
import modifyLinker from '../me/modify/_components/modify-linker.vue';
// hooks
import useLinkOfficial from '@/hooks/useLinkOfficial';
import useFetchOfficialAuthCode from '@/hooks/useFetchOfficialAuthCode';
// stores
import useUserInfo from '@/stores/user-info';


// 校园官网验证码和登陆数据对象 //////////////////////////////////////////
const {
    isFetching,
    authCode,
    dataObj,
    captchaBase64,
    refreshAuthCode,
} = useFetchOfficialAuthCode();


// 登陆官网逻辑 //////////////////////////////////////////
const userInfoStore = useUserInfo();
const backPage = ref<string>();

onMounted(async () => {
    await refreshAuthCode();

    // 登录成功后返回目标页面
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    // @ts-expect-error uniapp 没有标注 options 类型
    backPage.value = currentPage.options.backPage;
})

function gotoBackPage() {
    uni.showToast({
        title: '登录成功',
        icon: 'success',
    });

    setTimeout(() => {
        if (backPage.value) {
            uni.redirectTo({
                url: backPage.value
            });
        }
    }, 1500);
}

const studentId = ref(userInfoStore.studentId);
const linker = ref(userInfoStore.getDecryptedLinker());

const {
    studentIdInputRef,
    passwordInputRef,
    authCodeInputRef,
    isLinkingOfficial,
    submitLinkOfficialSignIn,
} = useLinkOfficial({
    dataObj: dataObj,
    authCode: authCode,
    studentId: studentId,
    linker: linker,
    onSuccess: gotoBackPage,
    onFail: refreshAuthCode,
});


// 修改信息逻辑 //////////////////////////////////////////
// 由于校园官网要求所有人修改密码，因此数据库的 linker 已经全部重置，检查 linker 是否为空判断是否需要重新设定密码
const doesModifyPopupShow = ref(!userInfoStore.linker);
function onClose() {
    doesModifyPopupShow.value = false;
}
// 监听 linker 变化，如果修改成功则关闭弹窗
watch(() => userInfoStore.linker, () => {
    linker.value = userInfoStore.getDecryptedLinker();
});
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
        class-name="pt-8"
    >
        <title-desc
            title="登录到校园门户"
            desc="登录后可以访问官网学业与生活服务信息"
        />
        <view class="mt-4 flex flex-col gap-y-3">
            <cusInput
                field-name="学号"
                ref="studentIdInputRef"
                :value="studentId"
                @input="e => studentId = e.value"
            />
            <cusInput
                field-name="官网密码"
                type="password"
                ref="passwordInputRef"
                :value="linker"
                @input="e => linker = e.value"
            />
            <view class="flex items-start gap-x-4">
                <cusInput
                    class="flex-1"
                    field-name="验证码"
                    ref="authCodeInputRef"
                    :value="authCode"
                    @input="e => authCode = e.value"
                />
                <view
                    class="overflow-hidden w-[160px] h-[56px] bg-secondary rounded-md border 
                    flex items-center justify-center"
                    @click="refreshAuthCode"
                >
                    <spinner
                        v-if="isFetching"
                        size="medium"
                    />
                    <text
                        class="font-bold"
                        v-else-if="captchaBase64 === ''"
                    >
                        点击刷新验证码
                    </text>
                    <image
                        v-else
                        class="size-full"
                        :src="captchaBase64"
                    />
                </view>
            </view>
            <cusButton
                class="w-full mt-4"
                :variant="isLinkingOfficial ? 'loading' : 'primary'"
                @click="submitLinkOfficialSignIn"
            >
                {{ isLinkingOfficial ? "" : "登录" }}
            </cusButton>
        </view>
    </cus-page>
    <up-popup
        :show="doesModifyPopupShow"
        mode="bottom"
        :round="16"
        @close="onClose"
    >
        <modify-linker :on-close="onClose" />
        <view class="h-8" />
    </up-popup>
</template>
