<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import signupTexts from './_components/signup-texts.vue';
import username from './_components/username.vue';
import campusInfo from './_components/campus-info.vue';

const current = ref(0);
</script>

<template>
    <cus-page header-type="nav">
        <swiper 
            class="w-screen box-border h-full mt-8"
            :current="current"
        >
            <swiper-item class="box-border flex flex-col gap-6 px-4">
                <username />
            </swiper-item>
            <swiper-item class="box-border flex flex-col gap-6 px-4">
                <campus-info />
            </swiper-item>
            <swiper-item>
                <signup-texts title="绑定校园官网"
                    desc="绑定学校官网户账号可以帮助你更好地管理学业信息课表同步、成绩查询及其他学业信息服务都有我来搞定我们尊重您的隐私，因此您可以选择性保存这一信息" />
            </swiper-item>
        </swiper>
    </cus-page>
</template>