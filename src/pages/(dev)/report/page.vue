<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';


const content = [
    {
        title: "更新与修复",
        details: [
            "1. 优化了首页智能课表的课程名称在不同长度下的文本大小表现",
            "2. 优化了当官网功能调用失败时的错误提示",
            "3. 修复了教学周显示错误的问题",
            "4. 修复了剩余课程上课时间显示错误的问题",
        ]
    },
    {
        title: "问题解答",
        details: [
            "Q: 小程序上可以直接充电费吗？",
            `A: 正如我们的介绍文本所说，本小程序属于在校学生自主开发和运营的【非官方】校园小程序，且财务相关的操作涉及到大量数据安全和同学们的利益问题。
            因此，在小程序没有明确得到学校官方的允许下，我们不会考虑此功能。同时，由于水电费系统本身存在一定的技术缺陷，我们也无法直接将其嵌入到小程序中，还请各位同学理解`,
            "",
            "",
            "Q: 我的宿舍信息绑定错误，如何修改？",
            `A: 您可以在首页（今日页面）的右上角的设置中找到【修改个人信息】选项并在该页面中修改您的宿舍信息`,
            "",
            "",
            "Q: 是否考虑添加梦厅预约和选课等功能？",
            `A: 考虑！但由于梦厅预约和选课等数据提交相关的功能涉及到数据操作逻辑的严谨性与一致性问题，存在一定的复杂性，因此我们会在后期考虑设计该功能。
            此外，由于在小程序进行选课的能力依然来自官网，因此“选课卡”问题不会有任何显著改善，小程序能做的更多是交互层面的优化`,
            "",
            "",
            "Q: 为什么使用教务系统的相关功能经常会出现网络错误",
            `A: 我们注意到了这一问题，其与教务系统数据请求的方式有密切关系。
            由于小程序遵守浏览器规范，用户授权我们进行数据代请求时，小程序没有能力在本地处理用户的官网登陆凭证，因此我们使用了一个代理服务器来统一处理登陆凭证相关的逻辑。
            因为代理服务器只有唯一一个 IP 地址，且出于一定的安全和道德考虑，我们不会通过一些非常规手段来规避这一问题，因此在有大量用户同时使用代理服务器处理请求时，代理服务器可能会被限流从而造成请求失败。
            该错误也可能是由于一些设计问题引发的，目前较难定位，我们正在努力排查中。请各位同学遇到错误时尽可能手动重试，敬请谅解`,

        ]
    }
]
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <scroll-view
            class="overflow-hidden flex-1"
            scroll-y
        >
            <title-desc
                title="9月11日开发者报告"
                title-size="medium"
                desc="以下是针对 9.8 - 9.11 日期间，与小程序相关的更新/修复说明和问题解答"
            />
            <view
                v-for="item in content"
                :key="item.title"
                class="mt-8 flex flex-col gap-y-1"
            >
                <text class="text-xl font-bold">
                    {{ item.title }}
                </text>
                <text
                    v-for="detail, index in item.details"
                    :key="index"
                    class="block text-sm text-secondary-foreground"
                >
                    {{ detail }}
                </text>
            </view>
            <view class="h-8" />
        </scroll-view>
    </cus-page>
</template>
