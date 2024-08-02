<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
import spinner from '@/components/spinner.vue';
// linkOfficial
import { 
    signInToOfficial,
    getSignInSessionAndAuthCode
} from '@/utils/link-official';
// zod
import { ZodError, z } from 'zod';



const backPage = ref<string>();
const isAuthCodeRefreshing = ref(false);

const captchaBase64 = ref<string>('');
const authCode = ref<string>('');
const dataObj = ref();

async function refreshAuthCode() {
    isAuthCodeRefreshing.value = true;
    
    authCode.value = '';
    const data = await getSignInSessionAndAuthCode();
    if (data) {
        captchaBase64.value = "data:image/png;base64," + data.authCodeImg;
        dataObj.value = data.dataObj;
    }

    isAuthCodeRefreshing.value = false;
}
onMounted(async () => {
    await refreshAuthCode();

    // 登录成功后返回目标页面
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    // @ts-expect-error uniapp 没有标注 options 类型
    backPage.value = currentPage.options.backPage;
})


const studentIdInputRef = ref();
const passwordInputRef = ref();
const authCodeInputRef = ref();
const studentId = ref('');
const password = ref('');
const isLinkingOfficial = ref(false);

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
            studentId: studentId.value,
            password: password.value,
            authCode: authCode.value,
        });
        
        
        // 2. 登录官网
        const res = await signInToOfficial(
            form.studentId,
            form.password,
            form.authCode,
            dataObj.value,
        )
        
        if (!res.ok) {
            await refreshAuthCode();

            return;
        }

        uni.showToast({
            title: "登录成功",
            icon: "success",
        });

        if (backPage.value) {
            uni.redirectTo({
                url: backPage.value,
            });
        } else {
            uni.navigateBack();
        }
    } catch (err) {
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
    } finally {
        isLinkingOfficial.value = false;
    }
}
</script>

<template>
    <cus-page header-type="nav" padding-x="16" class-name="pt-8">
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
                        v-if="isAuthCodeRefreshing" 
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
                @click="handleLinkOfficial"
            >
                {{ isLinkingOfficial ? "" : "绑定" }}
            </cusButton>
        </view>

    </cus-page>
</template>
