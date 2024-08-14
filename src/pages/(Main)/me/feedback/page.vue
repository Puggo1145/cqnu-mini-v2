<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';
import cusSelect from '@/components/cus-select.vue';
import titleDesc from '@/components/title-desc.vue';
// stores
import useUserInfo from '@/stores/user-info';
// api
import { submitUserFeedback } from '@/api/user';
// zod
import { z } from 'zod';
// types
import type { CusSelectEvent } from '@/components/cus-select.vue';


const { openid } = useUserInfo();


const currentFeedbackType = ref(0);
const feedbackTypes = [
    "功能建议",
    "问题反馈",
    "其他"
];
function onFeedbackTypeChange(e: CusSelectEvent) {
    currentFeedbackType.value = e.value;
}


const content = ref('');
const contentErrorMsg = ref<string | null>(null);
function onContentChange(e: any) {
    contentErrorMsg.value = null;
    content.value = e.detail.value;
}


const isSubmitting = ref(false);
const feedbackSchema = z.object({
    content: z.string().min(1).max(200),
});
const submitFeedback = async () => {
    isSubmitting.value = true;

    try {
        const feedback = feedbackSchema.parse({
            content: content.value,
        });

        const isSuccess = await submitUserFeedback({
            openid: openid!,
            type: feedbackTypes[currentFeedbackType.value],
            content: feedback.content,
        });

        if (isSuccess) {
            uni.showToast({
                title: '提交成功',
                icon: 'success',
            });
            setTimeout(() => {
                uni.navigateBack();
            }, 1500);
        };
    } catch (err) {
        if (err instanceof z.ZodError) {
            if (err.errors[0].code === "too_small") {
                contentErrorMsg.value = "内容不能为空";
            } else if (err.errors[0].code === "too_big") {
                contentErrorMsg.value = "内容不能超过 200 字";
            }
        }
    } finally {
        isSubmitting.value = false;
    }
}


onMounted(() => {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];

    // @ts-expect-error uniapp 没有标注 options 类型
    if (currentPage.options.type) {
        // @ts-expect-error uniapp 没有标注 options 类型
        currentFeedbackType.value = currentPage.options.type;
    }
})
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <title-desc
            class="mt-8"
            title="意见反馈"
            desc="向开发者团队反馈小程序使用期间的问题或功能建议"
        />
        <view class="mt-4 w-full flex flex-col gap-y-3">
            <cus-select 
                :value="currentFeedbackType"
                :range="feedbackTypes"
                @change="onFeedbackTypeChange"
            />

            <view>
                <textarea 
                    name="easyNoteContent" 
                    class="w-full h-[160px] p-4 border border-solid border-[#E0E0E0]
                    rounded-2xl bg-white flex flex-col"
                    placeholder="请输入您的建议或反馈（1-200 字）, 说明您在什么场景下遇到了什么问题，或希望添加什么功能"
                    :value="content"
                    @input="onContentChange"
                />
                <view class="mt-1 px-4 w-full flex items-center justify-between">
                    <text class="text-sm text-red-500">
                        {{ contentErrorMsg }}
                    </text>
                    <text class="text-sm text-secondary-foreground">
                        {{content.length}}/200
                    </text>
                </view>
            </view>

            <cus-button
                class="mt-4"
                :variant="isSubmitting ? 'loading' : 'primary'"
                @click="submitFeedback"
            >
                提交反馈
            </cus-button>
        </view>
    </cus-page>
</template>
