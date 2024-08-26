<script setup lang="ts">
import { ref } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// store
import useUserInfo from '@/stores/user-info';
// api
import { updateLinker, validateTokenAndSyncUserInfo } from '@/api/user';
// utils
import { encryptLinker } from '@/utils/encrypter';
// types
import type { CusInputEvent } from '@/components/cus-input.vue';
// zod
import { z } from 'zod';


const { onClose } = defineProps<{ onClose: () => void }>();


const userInfoStore = useUserInfo();

const linker = ref(userInfoStore.getDecryptedLinker());
const linkerRef = ref();
function modifyLinker(e: CusInputEvent) {
    linker.value = e.value;
}


const isSubmitting = ref(false);
const linkerSchema = z.string().min(1)
async function submitModification() {
    if (!userInfoStore.linker) {
        uni.showToast({
            title: "请等待用户信息加载完毕",
            icon: "none"
        });
        
        return;
    }

    isSubmitting.value = true;

    try {
        const checkedLinker = linkerSchema.parse(linker.value);

        // 加密
        const encryptedLinker = encryptLinker(checkedLinker);
        
        const isSuccess = await updateLinker({ 
            oldLinker: userInfoStore.linker,
            newLinker: encryptedLinker,
            confirmLinker: encryptedLinker
        });

        if (isSuccess) {
            await validateTokenAndSyncUserInfo();
            
            uni.showToast({
                title: "修改成功",
                icon: "success"
            });

            onClose();
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            if (err.errors[0].code === "too_small") {
                linkerRef.value.showError("密码不能为空");
            }
        }
    } finally {
        isSubmitting.value = false;
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
            ref="linkerRef"
            :value="linker"
            @input="modifyLinker"
        />
        <cus-button 
            @click="submitModification"
            :variant="isSubmitting ? 'loading' : 'primary'"
        >
            保存
        </cus-button>
    </view>
</template>
