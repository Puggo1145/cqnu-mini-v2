<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import cusSelect from '@/components/cus-select.vue';
import cusButton from '@/components/cus-button.vue';
import tagSelector from '@/components/tag-selector.vue';
import formItem from '@/components/form/form-item.vue';
import formItemText from '@/components/form/form-item-text.vue';
import imageUploader from '@/components/image-uploader.vue';
// utils
import { getDate, getCurrentTime } from '@/utils/timeHandler';
// api
// import { getWeixinAccessToken, msgSecCheck } from '@/api/wx'
// hooks
import { useCourses } from '@/hooks/useCourses';
import useCreateEasyNote from '@/hooks/useCreateEasyNote';
import useFetchEasyNoteTags from '@/hooks/useFetchEasyNoteTags';
// utils
import { addMinutes, format } from 'date-fns';
// store
import { useSchedule } from '@/stores/useSchedule';
// static
import icons from '@/constants/icons';
// types
import { ZodError } from 'zod';
import type { Tag } from '@/components/tag-selector.vue';


// 标题与内容
const title = ref('');
const titleInputRef = ref();
const content = ref('');


// 时间选择
const now = new Date();
const startTime = ref<string>(format(now , 'HH:mm')); // 允许选择的最早时间：当前时间
const selectedTime = ref<string>(format(addMinutes(now , 60), 'HH:mm')); // 默认选择的时间：当前时间的 30 分钟后

const currentDate = ref(getDate());
function onDateChange(e: any) {
    currentDate.value = e.value;
    const current = new Date(currentDate.value)
    const today = new Date();
    if (current > today) {
        startTime.value = '00:00'
    }
}


// 可选课程
const relatedCourses = useSchedule().getNamesOfLessons();
const { indexOfCurrentCourse } = useCourses();
const selectedCourseIndex = ref(indexOfCurrentCourse.value);


// tags
const { tags, isFetching, error } = useFetchEasyNoteTags();
const selectedTags = ref<Tag[]>([]);


// 创建小记
const { isCreating, handleCreateEasyNote } = useCreateEasyNote();

// 创建小记前的文本安全检查
// const handleSecurityCheck = async (content: string, scene: number) => {
//     await getWeixinAccessToken();

//     const openid = uni.getStorageSync('openid');
//     const body = {
//         content,
//         scene,
//         openid,
//         version: 2,
//     }

//     const isPass = await msgSecCheck(body);
//     return isPass;
// };

async function createEasyNote() {
    isCreating.value = true;

    try {
        // const isPass = await handleSecurityCheck(content.value, 2);
        // if (!isPass) {
        //     uni.showToast({
        //         icon: 'error',
        //         title: '内容违规',
        //         duration: 1500,
        //     })
        //     return;
        // }

        await handleCreateEasyNote({
            title: title.value,
            content: content.value,
            imagesUrl: [],
            deadline: `${currentDate.value} ${selectedTime.value}:00`,
            courseName: relatedCourses[selectedCourseIndex.value],
            tagIds: selectedTags.value.map(tag => tag.id),
        })
    } catch (err) {
        if (err instanceof ZodError) {
            err.errors.forEach(err => {
                if (err.path[0] === 'title') {
                    titleInputRef.value.showError(err.message);
                } else if (err.path[0] === 'content') {
                    uni.showToast({
                        title: err.message,
                        icon: 'none',
                        duration: 1200
                    });
                }
            })
        }
    } finally {
        isCreating.value = false;
    }
}
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <scroll-view
            class="mt-3 overflow-hidden flex-1 pb-4"
            scroll-y
        >
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
                    class="w-full flex-1 leading-normal"
                    placeholder="记录本节课值得注意的事情(1-200 字)"
                    :value="content"
                    @input="e => {
                        // @ts-expect-error uniapp 没有标注 Event 类型
                        content = e.detail.value
                    }"
                />
                <!-- <image-uploader 
                    :max-count="1" 
                    >
                    <view class="size-6">
                        <image :src="icons.image" class="size-full" />
                    </view>
                </image-uploader> -->
            </view>
            <form-item>
                <form-item-text>
                    截止日期
                </form-item-text>
                <cus-select
                    mode="date"
                    :icon="icons.calendar"
                    :value="currentDate"
                    :start="currentDate"
                    @change="onDateChange"
                />
            </form-item>
            <form-item>
                <form-item-text>
                    截止时间（默认为当前时间的 1 小时后）
                </form-item-text>
                <cus-select
                    mode="time"
                    :icon="icons.clock"
                    :value="selectedTime"
                    :start="startTime"
                    @change="e => selectedTime = e.value"
                />
            </form-item>
            <form-item>
                <form-item-text>
                    小记关联课程
                </form-item-text>
                <cus-select
                    mode="selector"
                    :icon="icons.academy"
                    :value="selectedCourseIndex"
                    :range="relatedCourses"
                    @change="e => selectedCourseIndex = e.value"
                />
            </form-item>
            <form-item>
                <form-item-text>
                    标签（点击选择）
                </form-item-text>
                <tag-selector
                    :tags="tags"
                    :selected-tags="selectedTags"
                    :is-fetching="isFetching"
                    :error="error"
                    @change="updatedTags => selectedTags = updatedTags"
                />
            </form-item>
        </scroll-view>
        <view class="mb-5">
            <cus-button
                :variant="tags.length === 0 && 'muted'
                    || isCreating && 'loading'
                    || 'primary'"
                @click="createEasyNote"
                :disabled="tags === undefined || isCreating"
            >
                创建
            </cus-button>
        </view>
    </cus-page>
</template>
