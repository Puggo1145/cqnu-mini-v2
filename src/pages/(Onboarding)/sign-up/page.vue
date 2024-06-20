<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import username from './_components/username.vue';
import campusInfo from './_components/campus-info.vue';
import linkOfficial from './_components/linkOfficial.vue';

const current = ref(0);
const updateCurrent = (value: number) => current.value = value;
</script>

<template>
    <cus-page header-type="nav">
        <swiper
            class="w-screen box-border h-full mt-8"
            :current="current"
            @change="(e: any) => updateCurrent(e.detail.current)"
        >
            <swiper-item class="box-border flex flex-col gap-6 px-4">
                <username 
                    :current="current" 
                    @update:current="updateCurrent"
                />
            </swiper-item>
            <swiper-item class="box-border flex flex-col gap-6 px-4">
                <campus-info 
                    :current="current" 
                    @update:current="updateCurrent"
                />
            </swiper-item>
            <swiper-item class="box-border flex flex-col gap-6 px-4">
                <link-official />
            </swiper-item>
        </swiper>
    </cus-page>
</template>