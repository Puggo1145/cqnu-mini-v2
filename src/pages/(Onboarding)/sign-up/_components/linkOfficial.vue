<script setup lang="ts">
import { computed } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// api
import { getStudentInfo } from '@/utils/link-official';
// constants
import { identityMapper } from '@/constants/signup/campus-info';
// hooks
import useFetchOfficialAuthCode from '@/hooks/useFetchOfficialAuthCode';
import useLinkOfficial from '@/hooks/useLinkOfficial';
// store
import { useSignupInfo } from '@/stores/signup-info';
// linkOfficial
import { linkOfficialTexts } from '@/constants/signup/signup-texts';


// 校园官网验证码和登陆数据对象 //////////////////////////////////////////
const {
    authCode,
    dataObj,
    captchaBase64,
    refreshAuthCode,
} = useFetchOfficialAuthCode();

// 登陆按钮是否 disabled
const stores = useSignupInfo();
const isSignInAllowed = computed(() =>
    captchaBase64.value
    && stores.studentId.length > 0
    && stores.linker.length > 0
    && authCode.value.length > 0
);


// 登陆官网逻辑 //////////////////////////////////////////

// 登录成功后的回调
const emit = defineEmits(['update:current']);
async function syncStudentInfo() {
    const userInfoRes = await getStudentInfo();

    if (userInfoRes) {
        // 设定用户身份
        stores.setIdentity(identityMapper[userInfoRes.identity]);
        stores.setFaculty(userInfoRes.faculty);
        stores.setMajor(userInfoRes.major);
        stores.setStuClass(userInfoRes.stuClass);

        // 进入下一页
        emit('update:current', 1);
    } else {
        await refreshAuthCode();
    }
}

const { 
    studentIdInputRef,
    passwordInputRef,
    authCodeInputRef,
    isLinkingOfficial,
    submitLinkOfficialSignIn,
} = useLinkOfficial({
    dataObj: dataObj,
    authCode: authCode,
    studentId: stores.studentId,
    linker: stores.linker,
    onSuccess: syncStudentInfo,
    onFail: refreshAuthCode,
});
</script>

<template>
    <view class="flex flex-col gap-6">
        <title-desc
            :title="linkOfficialTexts.title"
            :desc="linkOfficialTexts.desc"
        />
        <cusInput
            field-name="学号"
            ref="studentIdInputRef"
            :value="stores.studentId"
            @input="e => stores.setStudentId(e.value)"
        />
        <cusInput
            field-name="官网密码"
            type="password"
            ref="passwordInputRef"
            :value="stores.linker"
            @input="e => stores.setLinker(e.value)"
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
                <text
                    class="font-bold"
                    v-if="captchaBase64.length === 0"
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
            class="w-full"
            :variant="isLinkingOfficial
                ? 'loading'
                : isSignInAllowed ? 'primary' : 'muted'
                "
            :disabled="!isSignInAllowed"
            @click="submitLinkOfficialSignIn"
        >
            {{ isLinkingOfficial ? "" : "绑定" }}
        </cusButton>
    </view>
</template>
