<script setup lang="ts">
// components
import CusButton from '@/components/cus-button.vue';
// import lessonEditor from '@/components/lesson-editor.vue';
// utils
import { getDate } from '@/utils/timeHandler';
// api
import { getSchedules } from '@/utils/link-official';
// stores
import { useSchedule } from '@/stores/useSchedule';
import { useLinkOfficialAuth } from '@/stores/link-official-auth';
// static
import icons from '@/constants/icons';
import { ref } from 'vue';
// types
import type { Lesson } from '@/stores/useSchedule';

interface ScheduleHeaderProps {
    currentWeek: number;
    currentViewingWeek: number;
    isTermStarted: boolean;
}
const props = defineProps<ScheduleHeaderProps>();


const schedule = useSchedule();
const linkOfficialAuth = useLinkOfficialAuth();
const showLessonEditor = ref(false);

async function updateSchedule() {
    if (!linkOfficialAuth.mainCookie) {
        uni.navigateTo({
            url: `/pages/(Main)/link-official/page`,
        });
        return;
    }

    uni.showLoading({ title: '正在同步' });

    const res = await getSchedules();
    if (res) {
        schedule.setLessonsToStorage(res);
        uni.showToast({
            title: "同步成功",
            icon: "success",
            duration: 800
        })
    }
}

// function addLocalLesson(lesson: Omit<Lesson, 'lesson_id' | 'isLocal'>) {
//     schedule.addLocalLesson(lesson);
//     showLessonEditor.value = false;
//     uni.showToast({
//         title: "添加成功",
//         icon: "success",
//         duration: 800
//     });
// }
</script>

<template>
    <view class="px-4 pr-6 flex justify-between items-center">
        <view class="flex flex-col gap-y-1">
            <text class="font-bold">
                {{ getDate("/") }}
            </text>
            <view class="text-secondary-foreground">
                <text>
                    第{{ props.currentViewingWeek }}周
                </text>
                <text
                    v-if="props.currentWeek !== props.currentViewingWeek || !props.isTermStarted"
                    class="ml-2"
                >
                    非本周
                </text>
            </view>
        </view>
        <!-- 课表相关功能 -->
        <view class="flex items-center gap-x-3">
            <!-- <cus-button 
                variant="secondary"
                @click="showLessonEditor = true"
            >
                <image :src="icons.plus" class="size-4 mr-2" />
                <text class="text-sm">添加</text>
            </cus-button> -->
            <cus-button 
                variant="secondary"
                @click="updateSchedule"
            >
                <image :src="icons.syncBlack" class="size-4 mr-2" />
                <text class="text-sm">同步</text>
            </cus-button>
        </view>
    </view>

    <!-- <up-popup
        :show="showLessonEditor"
        mode="bottom"
        :round="16"
        @close="showLessonEditor = false"
        class="max-h-[80vh]"
    >
        <view class="overflow-hidden pt-6 px-4 flex flex-col h-[76vh]">
            <text class="mb-3 text-2xl font-bold">添加课程</text>
            <lesson-editor
                :onClose="() => showLessonEditor = false"
                :onSubmit="addLocalLesson"
            />
        </view>
    </up-popup> -->
</template>
