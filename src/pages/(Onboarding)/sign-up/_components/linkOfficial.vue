<script setup lang="ts">
// components
import signupTexts from '../_components/signup-texts.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// constants
import { linkOfficialTexts } from '@/constants/signup/signup-texts';
// stores
import { useSignupInfo } from '@/stores/signup-info';


const stores = useSignupInfo();


const emit = defineEmits(['update:current']);
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts 
            :title="linkOfficialTexts.title" 
            :desc="linkOfficialTexts.desc" 
        />
        <cusInput 
            field-name="学号" 
            :value="stores.studentId"
            disabled  
        />
        <cusInput 
            field-name="官网密码" 
            type="password"
        />
        <cusButton 
            variant="muted" 
            class="w-full"
        >
            绑定
        </cusButton>
        <cusButton 
            variant="outline"
            @click="() => emit('update:current')"
        >
            暂不绑定
        </cusButton>
    </view>
</template>