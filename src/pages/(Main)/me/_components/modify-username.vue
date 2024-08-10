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


const userInfoStore = useUserInfo();
const usernameInputRef = ref();
function modifyUsername(e: CusInputEvent) {
    userInfoStore.username = e.value;
}

</script>

<template>
    <view class="w-full px-4 flex flex-col gap-y-4">
        <title-desc 
            title="修改用户名"
            desc="用户名长度为 2-12 个字符"
        />
        <cus-input 
            field-name="用户名"
            ref="usernameInputRef"
            :value="userInfoStore.username"
            @input="modifyUsername"
        />
        <cus-button>
            保存
        </cus-button>
    </view>
</template>
