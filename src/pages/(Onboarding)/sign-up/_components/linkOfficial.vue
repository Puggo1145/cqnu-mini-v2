<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import signupTexts from '../_components/signup-texts.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// constants
// linkOfficial
import LinkOfficial from '@/utils/link-official';
import { linkOfficialTexts } from '@/constants/signup/signup-texts';
import { identityMapper } from '@/constants/signup/campus-info';
// stores
import { useSignupInfo } from '@/stores/signup-info';
// zod
import { ZodError, z } from "zod";


const captchaBase64 = ref<string>('');
const authCode = ref<string>('');
const dataObj = ref();

async function refreshAuthCode() {
    authCode.value = '';
    const data = await LinkOfficial.getSignInSessionAndAuthCode();
    if (data) {
        captchaBase64.value = "data:image/png;base64," + data.authCodeImg;
        dataObj.value = data.dataObj;
    }
}
onMounted(async () => {
    // 清除教务系统 cookie 缓存
    uni.setStorageSync('JwxtCookie', null);
    await refreshAuthCode();
})


const stores = useSignupInfo();
const studentIdInputRef = ref();
const passwordInputRef = ref();
const authCodeInputRef = ref();
const isLinkingOfficial = ref(false);
const emit = defineEmits(['update:current']);

const linkOfficialSchema = z.object({
    studentId: z.string()
        .trim()
        .length(13, "请输入 13 位学号"),
    password: z.string()
        .trim()
        .min(1, "密码不能为空"),
    authCode: z.string()
        .trim()
        .min(1, "验证码不能为空"),
});

async function handleLinkOfficial() {
    isLinkingOfficial.value = true;

    try {
        // 1. 验证表单
        const form = linkOfficialSchema.parse({
            studentId: stores.studentId,
            password: stores.password,
            authCode: authCode.value,
        });
        console.log(form);
        
        
        // 2. 登录官网
        const signInRes = await LinkOfficial.signInToOfficial(
            form.studentId,
            form.password,
            form.authCode,
            dataObj.value,
        )
        if (!signInRes.success) {
            await refreshAuthCode();
            uni.showToast({
                title: signInRes.message,
                icon: 'none',
            });
            isLinkingOfficial.value = false;

            return;
        }

        // 3. 获取学生信息
        const userInfoRes = await LinkOfficial.getStudentInfo();
        if (userInfoRes) {
            console.log(userInfoRes);
            // 设定用户身份
            stores.setIdentity(identityMapper[userInfoRes.identity]);
            stores.setFaculty(userInfoRes.faculty);
            stores.setMajor(userInfoRes.major);
            stores.setStuClass(userInfoRes.stuClass);
        }

        // 4. 进入下一页
        emit('update:current', 1);
        isLinkingOfficial.value = false;
    } catch (err) {
        isLinkingOfficial.value = false;

        if (err instanceof ZodError) {
            // 显示错误消息
            err.errors.forEach((error) => {
                if (error.path[0] === 'studentId') {
                    studentIdInputRef.value.showError(error.message);
                } else if (error.path[0] === 'password') {
                    passwordInputRef.value.showError(error.message);
                } else if (error.path[0] === 'authCode') {
                    authCodeInputRef.value.showError(error.message);
                }
            });
        }
    }
}

</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts 
            :title="linkOfficialTexts.title" 
            :desc="linkOfficialTexts.desc" 
        />
        <cusInput 
            field-name="学号" 
            ref="studentIdInputRef"
            :value="stores.studentId"
            @input="e => stores.studentId = e.value"
        
        />
        <cusInput 
            field-name="官网密码"
            type="password"
            ref="passwordInputRef"
            :value="stores.password"
            @input="e => stores.password = e.value"
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
                    v-if="captchaBase64 === ''"
                >
                    手动刷新验证码
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
            :variant="isLinkingOfficial ? 'loading' : 'primary'"
            @click="handleLinkOfficial"
        >
            {{ isLinkingOfficial ? "" : "绑定" }}
        </cusButton>
        <cusButton
            v-if="stores.faculty"
            variant="ghost"
        >
            继续
        </cusButton>
    </view>
</template>