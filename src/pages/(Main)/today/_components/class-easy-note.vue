<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
// components
import cusButton from '@/components/cus-button.vue';
import noNote from './no-note.vue';
import easyNoteCard from '@/pages/(Main)/study/easy-note/_components/easy-note-card.vue';
import loading from '@/components/loading.vue';
import cusError from '@/components/cus-error.vue';
import requireSchedule from '../../study/easy-note/_components/require-schedule.vue';
// static
import icons from '@/constants/icons';
// store
import { useClassEasyNoteStore } from '@/stores/easy-note/class-easy-note';
import { useSchedule } from '@/stores/useSchedule';


interface ClassEasyNoteProps {
    currentCourseName: string | null;
}
const props = defineProps<ClassEasyNoteProps>();


const current = ref(1);
const pageSize = ref(5);
const clasEasyNoteStore = useClassEasyNoteStore();
const scheduleStore = useSchedule();
onMounted(async () => {
    // 今日无课，显示今天的小记
    if (scheduleStore.lessons.length === 0) return;

    await clasEasyNoteStore.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        courseName: props.currentCourseName || "",
        tagName: "",
        timespan: "今日内",
    });
})


watch(() => props.currentCourseName, newVal => {
    clasEasyNoteStore.currentCourse = newVal;
    clasEasyNoteStore.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        courseName: newVal || "",
        tagName: "",
        timespan: "今日内",
    });
})
watch(() => scheduleStore.lessons, () => {
    clasEasyNoteStore.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        courseName: clasEasyNoteStore.currentCourse || "",
        tagName: "",
        timespan: "今日内",
    });
})


function goToEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/page',
    });
}
function goToCreateEasyNote() {
    uni.navigateTo({
        url: '/pages/(Main)/study/easy-note/_components/create-easy-note'
    });
}
</script>

<template>
    <view class="mt-8">
        <view class="flex items-center justify-between">
            <text class="text-2xl font-bold">
                {{ 
                    !props.currentCourseName && scheduleStore.lessons.length !== 0 && "今日小记"
                    || "课堂小记"
                }}
            </text>
            <cusButton 
                variant="ghost" 
                class-name="text-secondary-foreground font-normal"
                @click="goToEasyNote"
            >
                更多小记
                <image :src="icons.rightSecondary" class="w-5 h-5" />
            </cusButton>
        </view>
        
        <text
            v-if="!props.currentCourseName && scheduleStore.lessons.length !== 0"
            class="text-sm text-secondary-foreground"
        >
            今日课程已结束，快来看看今天有什么小记吧
        </text>
        
        <view class="pt-3">

            <!-- 小记状态 -->
            <require-schedule 
                v-if="scheduleStore.lessons.length === 0"
                class="mt-4"
            />
            <loading
                v-else-if="clasEasyNoteStore.notes === undefined && !clasEasyNoteStore.error"
                class="mt-4"
            />
            <no-note 
                v-else-if="clasEasyNoteStore.notes && clasEasyNoteStore.notes.length === 0"
                class="mt-4"
            />
            <cus-error 
                v-else-if="clasEasyNoteStore.error"
                class="mt-4"
            />
            
            <view v-else class="flex flex-col gap-3">
                <easy-note-card 
                    v-for="note in clasEasyNoteStore.notes"
                    :key="note.id"

                    :id="note.id"
                    :title="note.title"
                    :content="note.content"
                    :images-url="note.imagesUrl"
                    :deadline="note.deadline"
                    :course-name="note.courseName"
                    :tag-list="note.tagList"
                    :openid="note.openid"
                    :username="note.username"
                    :seeNumber="note.seeNumber"
                    :supportNumber="note.supportNumber"
                />
                <view 
                    class="w-full h-[96px] bg-secondary rounded-2xl flex justify-center items-center"
                    @click="goToCreateEasyNote"
                >
                    <image :src="icons.plus" class="size-9"/>
                </view>
            </view>
        </view>
    </view>
</template>