<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import cusSelect from '@/components/cus-select.vue';
import cusButton from '@/components/cus-button.vue';
// utils
import { getDate, getCurrentTime } from '@/utils/utils';
// mock
import { mockRelatedCourses } from '@/mock/easy-note';
// static
import icons from '@/constants/icons';


const tags = ref(["重要", "作业", "考试"]);
const relatedCourses = ref(mockRelatedCourses);


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
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <text class="mt-3 text-3xl">
            创建小记
        </text>
        <scroll-view 
            class="mt-3 overflow-hidden flex-1"
            scroll-y
        >
            <cus-input 
                field-name="标题" 
            />
            <view
                class="mt-3 w-full h-[160px] p-4 border border-solid border-[#E0E0E0] 
                rounded-2xl bg-white flex flex-col"
            >
                <textarea 
                    name="easyNoteContent" 
                    class="w-full flex-1"
                    placeholder="记录本节课值得注意的事情"
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
                        v-for="(tag, index) in tags"
                        :key="index"
                        class="px-4 py-2 rounded-full bg-secondary 
                        text-sm font-bold text-secondary-foreground leading-none"
                    >
                        <text>{{ tag }}</text>
                    </view>
                </view>
            </view>
        </scroll-view>
        <view class="mb-5">
            <cus-button>
                创建
            </cus-button>
        </view>
    </cus-page>
</template>
