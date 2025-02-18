<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
import spinner from '@/components/spinner.vue';
// hooks
import useLinkOfficial from '@/hooks/useLinkOfficial';
import useFetchOfficialAuthCode from '@/hooks/useFetchOfficialAuthCode';
// stores
import useUserInfo from '@/stores/user-info';

// 校园官网验证码和登陆数据对象
const {
    isFetching,
    authCode,
    dataObj,
    captchaBase64,
    refreshAuthCode,
} = useFetchOfficialAuthCode();

// 登陆官网逻辑
const userInfoStore = useUserInfo();

const backPage = ref<string>();
const titleDescType = ref<'initial' | 'default'>(userInfoStore.studentId ? 'default' : 'initial');
const titleDescContent = ref({
    initial: {
        title: '添加校园门户账号',
        desc: '添加官网校园门户账号后可以访问官网学业与生活服务信息。小程序非常重视您的隐私安全，您的账号和密码仅保存在本地设备，不会上传到云端'
    },
    default: {
        title: '登录到校园门户',
        desc: '请输入验证码获取校园门户信息'
    }
})
onMounted(async () => {
    // 获取 backPage
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    // @ts-expect-error uniapp 没有标注 options 类型
    backPage.value = currentPage.options.backPage;
})

const studentId = ref(userInfoStore.studentId);
const password = ref(userInfoStore.password);
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
    password: password,
    onSuccess: gotoBackPage,
    onFail: refreshAuthCode,
});

function gotoBackPage() {
    uni.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 500
    });

    // 保存用户信息
    userInfoStore.setUserInfo({
        studentId: studentId.value,
        password: password.value,
    });

    setTimeout(() => {
        if (backPage.value) {
            uni.redirectTo({
                url: backPage.value
            });
        } else {
            uni.navigateBack();
        }
    }, 500);
}
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
        class-name="pt-8"
    >
        <title-desc
            :title="titleDescContent[titleDescType].title"
            :desc="titleDescContent[titleDescType].desc"
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
                :value="password"
                @input="e => password = e.value"
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
</template>
