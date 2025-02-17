<script setup lang="ts">
// constants
import icons from '@/constants/icons';


interface Func {
    name: string;
    icon: string;
    page: string;
}
const funcs: Func[] = [
    { name: "修改个人信息", icon: icons.modifyUserInfo, page: "modify" },
    { name: "意见反馈", icon: icons.feedback, page: "feedback" },
    { name: "关于我们", icon: icons.about, page: "about" },
]

function goPage(page: string) {
    uni.navigateTo({
        url: `/pages/(Main)/me/${page}/page`
    })
}
</script>

<template>
    <view class="w-full flex flex-col gap-y-2">
        <view
            v-for="func in funcs"
            :key="func.name"
            class="w-full flex items-center gap-x-2 p-4 bg-secondary rounded-2xl"
            @click="() => goPage(func.page)"
        >
            <view class="w-6 h-6 flex items-center justify-center rounded-2xl">
                <image
                    :src="func.icon"
                    class="size-full"
                />
            </view>
            <text class="text-sm font-bold">
                {{ func.name }}
            </text>
        </view>
    </view>
</template>