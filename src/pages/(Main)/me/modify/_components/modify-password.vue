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
const password = ref(userInfoStore.password);
const passwordRef = ref();
function modifyPassword(e: CusInputEvent) {
    password.value = e.value;
}

const passwordSchema = z.string().min(1)
async function submitModification() {
    try {
        const checkedPassword = passwordSchema.parse(password.value);

        // 更新 store 中的密码
        userInfoStore.setUserInfo({ password: checkedPassword });

        uni.showToast({
            title: "修改成功",
            icon: "success",
            duration: 500
        });

        onClose();
    } catch (err) {
        if (err instanceof z.ZodError) {
            if (err.errors[0].code === "too_small") {
                passwordRef.value.showError("密码不能为空");
            }
        }
    }
}
</script>

<template>
    <view class="w-full px-4 flex flex-col gap-y-4 mt-4">
        <title-desc
            title="修改校园门户密码"
            desc="在小程序内修改校园门户密码并不会影响官网的密码。此处主要用于同步官网密码，以保证您能够在小程序内正常访问相关功能"
        />
        <cus-input
            field-name="新校园门户密码"
            ref="passwordRef"
            :value="password"
            @input="modifyPassword"
        />
        <cus-button @click="submitModification">
            保存
        </cus-button>
    </view>
</template>
