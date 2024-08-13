<script setup lang="ts">
import { ref } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// store
import useUserInfo from '@/stores/user-info';
// api
import { updateUserInfo } from '@/api/user';
// types
import type { CusInputEvent } from '@/components/cus-input.vue';
// zod
import { z } from 'zod';


const { onClose } = defineProps<{ onClose: () => void }>();


const userInfoStore = useUserInfo();
const username = ref(userInfoStore.username);
const usernameInputRef = ref();
function modifyUsername(e: CusInputEvent) {
    username.value = e.value;
}


const isSubmitting = ref(false);
const usernameSchema = z.string().min(2).max(6);
async function submitModification() {
    isSubmitting.value = true;

    try {
        usernameSchema.parse(username.value);
        
        const isSuccess = await updateUserInfo({ 
            username: username.value,
            openid: userInfoStore.openid!
        });
        if (isSuccess) {
            userInfoStore.username = username.value;
            
            uni.showToast({
                title: "修改成功",
                icon: "success"
            });

            onClose();
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            if (err.errors[0].code === "too_small") {
                usernameInputRef.value.showError("用户名长度不能小于 2 个字符");
            } else if (err.errors[0].code === "too_big") {
                usernameInputRef.value.showError("用户名长度不能大于 6 个字符");
            }
        }
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <view class="w-full px-4 flex flex-col gap-y-4">
        <title-desc 
            title="修改用户名"
            desc="用户名长度为 2-6 个字符"
        />
        <cus-input 
            field-name="用户名"
            ref="usernameInputRef"
            :value="userInfoStore.username"
            @input="modifyUsername"
        />
        <cus-button 
            @click="submitModification"
            :variant="isSubmitting ? 'loading' : 'primary'"
        >
            保存
        </cus-button>
    </view>
</template>
