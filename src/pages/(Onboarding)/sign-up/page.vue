<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';
import username from './_components/username.vue';
// import campusInfo from './_components/campus-info.vue';
import linkOfficial from './_components/linkOfficial.vue';
import checkInfo from './_components/check-info.vue';
import visualSignupInfo from './_components/visual-signup-info.vue';


const current = ref(0);

const nextPage = () => current.value += 1
const prevPage = () => current.value -= 1
const getCurrent = (e: any) => current.value = e.detail.current;
</script>

<template>
    <cus-page header-type="nav">
        <visual-signup-info :current="current" />
        <swiper 
            class="w-screen flex-1 box-border mt-8" 
            :current="current" 
            @change="getCurrent"
        >
            <swiper-item 
                class="box-border flex flex-col gap-6 px-4" 
                @touchmove.stop
            >
                <link-official @update:current="nextPage" />
            </swiper-item>
            <swiper-item 
                class="box-border flex flex-col gap-6 px-4" 
                @touchmove.stop
            >
                <username @update:current="nextPage" />
            </swiper-item>
            <!-- <swiper-item 
                class="box-border px-4"
                @touchmove.stop
            >
                <scroll-view
                    class="h-full"
                    scroll-y
                >
                    <campus-info 
                        @update:current="nextPage"
                    />
                    <cus-button 
                        class-name="mt-6"
                        variant="ghost"
                        @click="prevPage"
                    >
                        返回
                    </cus-button>
                    <view class="h-8"></view>
                </scroll-view>
            </swiper-item> -->
            <swiper-item class="box-border flex flex-col gap-6 px-4">
                <check-info />
                <cus-button variant="ghost" @click="prevPage">
                    返回
                </cus-button>
            </swiper-item>
        </swiper>
    </cus-page>
</template>