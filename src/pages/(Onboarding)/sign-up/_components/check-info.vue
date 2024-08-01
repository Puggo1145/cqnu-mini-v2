<script setup lang="ts">
import { ref } from 'vue';
// components
import titleDesc from '@/components/title-desc.vue';
import cusButton from '@/components/cus-button.vue';
// api
import { signup } from '@/api/auth';
// stores
import { useSignupInfo } from '@/stores/signup-info';
// utils
import { encryptLinker } from '@/utils/encrypter';



const stores = useSignupInfo();


const isSigningUp = ref(false);

async function goToSignUpProcess() {
    isSigningUp.value = true;

    const encryptedLinker = encryptLinker(stores.linker);

    console.log(encryptedLinker);
    
    const res = await signup({
        username: stores.username,
        studentId: stores.studentId,
        linker: encryptedLinker,
        identity: stores.identity!,
        faculty: stores.faculty!,
        major: stores.major!,
        stuClass: stores.stuClass!,
    });
    
    if (res?.success) {
        uni.redirectTo({
            url: '/pages/(Onboarding)/process-sign-up/page'
        });
    }

    isSigningUp.value = false;
}
</script>

<template>
    <view class="flex flex-col gap-6">
        <title-desc 
            title="请核对信息"
            desc="请核对您填写的信息，您当前依然可以返回修改。提交后，您将无法再修改这些信息"
        />
        <cusButton 
            :variant="isSigningUp ? 'loading' : 'primary'"
            @click="goToSignUpProcess"
        >
            {{ isSigningUp ? "" : "确认" }}
        </cusButton>
    </view>
</template>
