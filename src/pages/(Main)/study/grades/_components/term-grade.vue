<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// components
import cusSelect from '@/components/cus-select.vue';
// link official
import { getTermGrade } from '@/utils/link-official/scripts/jwxt';
// types
import type { CusSelectEvent } from '@/components/cus-select.vue';
import type { OriginalTermGrade } from '@/utils/link-official/scripts/jwxt';


// TODO - 从缓存获取学号以计算年级对应的学年码
const studentId = "2021050919079";

const gradeOptions = ["大一", "大二", "大三", "大四"]
const gradeIndex = ref(0);
function changeGrade(e: CusSelectEvent) {
    gradeIndex.value = e.value;
}

const semesterOptions = ["上", "下"]
const semesterIndex = ref(0);
function changeSemester(e: CusSelectEvent) {
    semesterIndex.value = e.value;
}

const transcript = ref<OriginalTermGrade["items"]>()


async function getTranscript() {
    // 将年级转换为学年码
    const firstYear = Number(studentId.slice(0, 4));
    const gradesInNums = Array.from(gradeOptions).map((_, i) => {
        return firstYear + i;
    })
    // 将学期转换为 xqm => 教务系统的学期码比较逆天
    const semesterMapper: Record<number, number> = {
        0: 3,  // 上学期
        1: 12  // 下学期
    };

    const xnm = gradesInNums[gradeIndex.value];
    const xqm = semesterMapper[semesterIndex.value];

    console.log(xnm, xqm);
    

    // TODO - 请求成绩单
    const res = await getTermGrade(xnm, xqm)
    
    if (res) {
        transcript.value = res.items;
    }
}


onMounted(() => {
    // 计算当前学年对应的 index 和学期对应的 index，用于初始化
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const firstYear = Number(studentId.slice(0, 4));
    const currentGradeIndex = currentYear - firstYear - 1;
    const currentSemesterIndex = currentMonth > 8 ? 0 : 1;

    gradeIndex.value = currentGradeIndex;
    semesterIndex.value = currentSemesterIndex;

    getTranscript();
})
watch([gradeIndex, semesterIndex], getTranscript)
</script>

<template>
    <view class="w-full h-full flex flex-col">
        <view class="flex gap-x-2">
            <cus-select
                variant="mini"
                :value="gradeIndex"
                :range="gradeOptions"
                @change="changeGrade"
            />
            <cus-select
                variant="mini"
                :value="semesterIndex"
                :range="semesterOptions"
                @change="changeSemester"
            />
        </view>
        <scroll-view
            scroll-y
            class="mt-4 overflow-hidden flex-1 bg-secondary rounded-2xl p-4"
        >
            <view
                v-for="(item, index) in transcript"
                :key="index"
                class="w-full h-12 flex justify-between border-b border-gray-200"
            >
                <text class="text-sm leading-[48px]">
                    {{ item.kcmc }}
                </text>
                <text class="text-sm font-bold leading-[48px]">
                    {{ item.bfzcj }}
                </text>
            </view>
        </scroll-view>
        <!-- 占位 -->
        <view class="h-6"></view>
    </view>
</template>
