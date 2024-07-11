<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import spinner from '@/components/spinner.vue';
import cusButton from '@/components/cus-button.vue';
import cusInput from '@/components/cus-input.vue';
// 爬虫测试
const captchaBase64 = ref<string>('');
const authCode = ref<string>('');

onMounted(() => {
    
})

</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <cus-button class-name="flex items-center gap-2"> 
            <spinner size="small" color="white" />
            测试
        </cus-button>
        <view class="mt-4">
            <image :src="captchaBase64" class="w-[100px] h-[30px] object-cover" />
            <cus-input @input="event => authCode = event.value" />
            <!-- <cus-button @click="loginOfficial">提交登录</cus-button> -->
        </view>
    </cus-page>
</template>

