<script setup lang="ts">
import { computed } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
// store
import useUserInfo from '@/stores/user-info';
// illustration
import { illustrations } from '@/constants/illustrations';


const userInfo = useUserInfo();
const userPublicInfo = computed(() => userInfo.getUserPublicInfo());
</script>

<template>
    <cus-page header-type="nav" padding-x="12">
        <view class="relative w-full aspect-square bg-[#E5D7CD] 
        rounded-2xl p-6 flex flex-col overflow-hidden">
            <image :src="illustrations.creating" class="size-full absolute left-0 top-14" />
            <view class="z-50 relative flex flex-col">
                <text class="text-2xl font-bold leading-[24px]">
                    {{ userPublicInfo.username }}
                </text>
                <view class="mt-2 flex line-clamp-1 gap-x-1">
                    <text class="text-sm text-secondary-foreground">
                        {{ userPublicInfo.faculty }} ｜
                    </text>
                    <text class="text-sm text-secondary-foreground">
                        {{ userPublicInfo.grade }} 级 ｜
                    </text>
                    <text class="text-sm text-secondary-foreground">
                        {{ userPublicInfo.stuClass }}
                    </text>
                </view>
            </view>
        </view>
        <view class="w-full flex flex-col gap-y-3 mt-3 bg-white p-4 rounded-2xl">
            <text class="text-sm font-bold">
                在想什么？
            </text>
        </view>
    </cus-page>
</template>
