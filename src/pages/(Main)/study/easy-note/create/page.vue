<script setup lang="ts">
import { onMounted, ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import cusSelect from '@/components/cus-select.vue';
import cusButton from '@/components/cus-button.vue';
// apis
import { getTags, createNote } from '@/api/easy-note';
// zod
import { z } from 'zod';
// utils
import { getDate, getCurrentTime } from '@/utils/timeHandler';
import { easyNoteTagColorMapper } from '@/constants/easy-note/easy-note-card';
// mock
import { mockRelatedCourses } from '@/mock/easy-note';
// store
import { useClassEasyNoteStore } from '@/stores/easy-note/class-easy-note';
import { useEasyNoteStore } from '@/stores/easy-note/easy-note';
// static
import icons from '@/constants/icons';
// types
import type { Tag } from '@/api/easy-note';


// 初始化 小记 stores
// 要根据当前课程和小记创建时选择的课程来选择对应的小记 store
// 如果创建时选择的课程与当前课程相同，同时更新两个 store
// 如果不同，只更新 easyNoteStore
const classEasyNoteStore = useClassEasyNoteStore();
const easyNoteStore = useEasyNoteStore();


// 初始化可选数据
const tags = ref<Tag[]>([]);
const relatedCourses = ref(mockRelatedCourses);
onMounted(async () => {
    // 从后端拉取可选的标签数据
    const data = await getTags();
    if (data) {
        tags.value = data;
    }
})


const currentDate = ref(getDate());
const currentTime = ref<string>(getCurrentTime());
const currentCourseIndex = ref<number>(0);

function onDateChange(e: any) {
    currentDate.value = e.value;
}
function onTimeChange(e: any) {
    currentTime.value = e.value;
}
function onCourseChange(e: any) {
    currentCourseIndex.value = e.value;
}


const selectedTags = ref<number[]>([]);
function onTagClick(tagId: number) {
    if (selectedTags.value.includes(tagId)) {
        selectedTags.value = selectedTags.value.filter(id => id !== tagId);
    } else {
        selectedTags.value.push(tagId);
    }
}


const titleInputRef = ref();
const title = ref('');
const content = ref('');

const easyNoteSchema = z.object({
    title: z.string()
        .min(1, "标题不能为空")
        .max(16, "标题不能超过 16 个字符"),
    content: z.string()
        .min(1, "内容不能为空")
        .max(200, "内容不能超过 200 个字符"),
    imagesUrl: z.array(z.string()),
    deadline: z.string(),
    courseName: z.string(),
    tagIds: z.array(z.number()),
});
async function createEasyNote() {
    try {
        // 1. 校验数据
        const form = easyNoteSchema.parse({
            title: title.value,
            content: content.value,
            imagesUrl: [],
            deadline: `${currentDate.value} ${currentTime.value}`,
            courseName: relatedCourses.value[currentCourseIndex.value],
            tagIds: selectedTags.value,
        });
        
        // 2. 创建小记
        const isSuccess = await createNote(form);

        if (isSuccess) {
            uni.showToast({
                title: '创建成功',
                icon: 'success',
            });
            setTimeout(() => {
                uni.navigateBack();
            }, 1500);
        }

        // TODO - 3. 更新 notes

    } catch (err) {
        if (err instanceof z.ZodError) {
            err.errors.forEach(err => {
                if (err.path[0] === 'title') {
                    titleInputRef.value.showError(err.message);
                } else if (err.path[0] === 'content') {
                    uni.showToast({
                        title: err.message,
                        icon: 'none',
                    });
                }
            })
        }
    }

}
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <text class="mt-3 text-3xl">
            创建小记
        </text>
        <scroll-view class="mt-3 overflow-hidden flex-1" scroll-y>
            <cus-input 
                field-name="标题" 
                ref="titleInputRef"
                :value="title"
                @input="e => title = e.value"
            />
            <view class="mt-3 w-full h-[160px] p-4 border border-solid border-[#E0E0E0] 
                rounded-2xl bg-white flex flex-col">
                <textarea 
                    name="easyNoteContent" 
                    class="w-full flex-1" 
                    placeholder="记录本节课值得注意的事情(1-200 字)"
                    :value="content"
                    @input="e => {
                        // @ts-expect-error uniapp 没有标注 Event 类型
                        content = e.detail.value
                    }"
                />
                <view class="size-6">
                    <image :src="icons.image" class="size-full" />
                </view>
            </view>
            <view class="mt-3 flex flex-col gap-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-2">
                    截止日期
                </text>
                <cus-select 
                    mode="date" 
                    :icon="icons.calendar" 
                    :value="currentDate" 
                    :start="currentDate"
                    @change="onDateChange" 
                />
            </view>
            <view class="mt-3 flex flex-col gap-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-2">
                    截止时间
                </text>
                <cus-select 
                    mode="time" 
                    :icon="icons.clock" 
                    :value="currentTime" 
                    :start="currentTime"
                    @change="onTimeChange" 
                />
            </view>
            <view class="mt-3 flex flex-col gap-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-2">
                    关联课程
                </text>
                <cus-select 
                    mode="selector" 
                    :icon="icons.academy" 
                    :value="currentCourseIndex" 
                    :range="relatedCourses"
                    @change="onCourseChange" 
                />
            </view>
            <view class="mt-3 flex flex-col gap-2">
                <text class="text-sm font-semibold text-secondary-foreground pl-2">
                    标签(点击选择)
                </text>
                <view class="flex items-center gap-2 mb-12">
                    <view 
                        v-for="tag in tags" 
                        :key="tag.id" 
                        class="px-4 py-2 rounded-full text-secondary-foreground
                        text-sm font-bold leading-none"
                        :class="selectedTags.includes(tag.id) && 'text-white'"
                        :style="{ backgroundColor: selectedTags.includes(tag.id) ? easyNoteTagColorMapper[tag.tagName] : '#eeeff1' }"
                        @click="() => onTagClick(tag.id)"
                    >
                        <text>{{ tag.tagName }}</text>
                    </view>
                </view>
            </view>
        </scroll-view>
        <view class="mb-5">
            <cus-button @click="createEasyNote">
                创建
            </cus-button>
        </view>
    </cus-page>
</template>
