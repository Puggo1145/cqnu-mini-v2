<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';
// static
import logo from "@/static/icons/logo.png";
// constants
import { developers, contributors } from '@/constants/about';
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <scroll-view
            scroll-y
            class="flex-1 w-full"
        >
            <view class="mt-8 flex items-center gap-x-4">
                <image
                    :src="logo"
                    class="size-16 rounded-full"
                />
                <view class="flex flex-col">
                    <text class="font-bold">智慧重师</text>
                    <text class="text-sm text-secondary-foreground">v2.0.0 Alpha</text>
                </view>
            </view>
            <view class="mt-9">
                <title-desc
                    title="开发者团队"
                    desc="小程序的核心开发团队由来自不同学院、不同专业、不同年级以及各有所长的同学组成"
                    title-size="medium"
                />
                <view class="mt-4 grid grid-cols-2 gap-2">
                    <view
                        v-for="developer in developers"
                        :key="developer.name"
                        class="w-full rounded-xl bg-secondary flex flex-col p-4"
                    >
                        <text class="text-sm font-bold">
                            {{ developer.name }}
                        </text>
                        <text class="text-sm text-secondary-foreground">
                            {{ developer.role }}
                        </text>
                    </view>
                </view>
            </view>
            <view class="mt-9">
                <title-desc
                    title="重要贡献者"
                    desc="感谢以下同学为小程序的开发和维护做出的重要贡献"
                    title-size="medium"
                />
                <view
                    v-for="contributor in contributors"
                    :key="contributor"
                    class="w-full rounded-xl bg-secondary flex flex-col p-4"
                >
                    <text class="text-sm font-bold">
                        {{ contributor }}
                    </text>
                </view>
            </view>
        </scroll-view>
    </cus-page>
</template>
