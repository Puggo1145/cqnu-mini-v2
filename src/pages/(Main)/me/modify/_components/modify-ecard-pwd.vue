<script setup lang="ts">
import { ref } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// store
import useUserInfo from '@/stores/user-info';
// types
import type { CusInputEvent } from '@/components/cus-input.vue';
// zod
import { z } from 'zod';

const { onClose } = defineProps<{ onClose: () => void }>();

const userInfoStore = useUserInfo();

const ecardPwd = ref(userInfoStore.cardPwd);
const ecardPwdRef = ref();
function modifyEcardPwd(e: CusInputEvent) {
    ecardPwd.value = e.value;
}

const pwdSchema = z.string().min(1)
async function submitModification() {
    try {
        const checkedEcardPwd = pwdSchema.parse(ecardPwd.value);
        
        // 更新 store 中的一卡通密码
        userInfoStore.setUserInfo({
            ecardPwd: checkedEcardPwd
        });

        onClose();
    } catch (err) {
        if (err instanceof z.ZodError) {
            if (err.errors[0].code === "too_small") {
                ecardPwdRef.value.showError("密码不能为空");
            }
        }
    }
}
</script>

<template>
    <view class="w-full px-4 flex flex-col gap-y-4 mt-4">
        <title-desc 
            title="修改一卡通密码"
            desc="由于官网密码（尤其是在官网密码被修改后）和一卡通密码不同步，为确保可以正常查询一卡通消费信息，您需要额外绑定一次一卡通密码，一卡通密码默认为您的身份证后六位。您可以在 首页右上角的设置-修改个人信息中 随时修改该信息"
        />
        <cus-input 
            field-name="一卡通密码"
            ref="ecardPwdRef"
            :value="ecardPwd"
            @input="modifyEcardPwd"
        />
        <cus-button @click="submitModification">
            保存
        </cus-button>
    </view>
</template>
