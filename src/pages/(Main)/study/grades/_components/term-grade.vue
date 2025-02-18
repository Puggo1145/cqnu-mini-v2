<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import spinner from '@/components/spinner.vue';
// components
import cusSelect from '@/components/cus-select.vue';
import noData from '@/components/no-data.vue';
// stores
import useUserInfo from '@/stores/user-info';
// link official
import { getTermGrade } from '@/utils/link-official';
// static
import icons from '@/constants/icons';
// types
import type { CusSelectEvent } from '@/components/cus-select.vue';
import type { OriginalTermGrade } from '@/utils/link-official/libs/jwxt/get-term-grade';


const userInfoStore = useUserInfo();


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


const isTranscriptLoading = ref(false);
const transcript = ref<OriginalTermGrade["items"]>();
const transcriptSearchResult = ref<OriginalTermGrade["items"]>();
const transcriptSearchInput = ref("");
function searchTranscript(e: Event) {
    // @ts-expect-error uniapp input 无类型标注
    transcriptSearchInput.value = e.detail.value;

    if (!transcriptSearchInput.value || transcriptSearchInput.value === "") {
        transcriptSearchResult.value = transcript.value;
        return;
    }
    
    transcriptSearchResult.value = transcript.value?.filter(item => {
        return item.kcmc.includes(transcriptSearchInput.value);
    });
}

async function getTranscript() {
    isTranscriptLoading.value = true;

    // 清空搜索框
    transcriptSearchInput.value = "";

    // 将年级转换为学年码
    const firstYear = Number(userInfoStore.studentId!.slice(0, 4));
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


    const res = await getTermGrade(xnm, xqm)
    if (res) {
        transcript.value = res.items;
        transcriptSearchResult.value = res.items;
    }

    isTranscriptLoading.value = false;
}



onMounted(() => {
    // 计算当前学年对应的 index 和学期对应的 index，用于初始化
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const firstYear = Number(userInfoStore.studentId!.slice(0, 4));
    const currentGradeIndex = currentYear - firstYear - 1;
    const currentSemesterIndex = currentMonth > 8 ? 0 : 1;

    gradeIndex.value = currentGradeIndex;
    semesterIndex.value = currentSemesterIndex;

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
            <view
                class="flex-1 bg-secondary rounded-2xl h-9 px-4 text-sm flex gap-x-2 items-center"
            >
                <image :src="icons.search" class="w-4 h-4" />
                <input
                    type="text"
                    placeholder="用课程名搜索"
                    :value="transcriptSearchInput"
                    @input="searchTranscript"
                >
            </view>
        </view>
        <scroll-view
            scroll-y
            class="mt-4 overflow-hidden flex-1 bg-secondary rounded-2xl px-4 py-2"
        >
            <view 
                v-if="isTranscriptLoading"
                class="mt-[92px] w-full h-12 flex flex-col gap-y-2 items-center justify-center"
            >
                <spinner size="medium" />
                <text class="text-sm text-gray-400">加载中</text>
            </view>

            <no-data
                v-else-if="!isTranscriptLoading && !transcript"
                title="网络错误"
                desc="请检查网络连接"
                :action="getTranscript"
                action-text="重试"
                class-name="mt-[92px]"
            />

            <no-data
                v-else-if="!isTranscriptLoading && transcript?.length === 0"
                title="暂无成绩"
                desc="该学期暂无成绩数据"
                class-name="mt-[92px]"
            />

            <view
                v-else-if="transcript && transcript.length > 0"
                v-for="(item, index) in transcriptSearchResult"
                :key="index"
                class="w-full flex justify-between items-center border-b border-gray-200 py-3"
            >
                <view class="flex flex-col gap-y-1 flex-1">
                    <text class="text-sm line-clamp-1">
                        {{ item.kcmc }}
                    </text>
                    <view class="flex gap-x-2">
                        <!-- 学分 -->
                        <text class="text-xs text-gray-400 font-bold">
                            {{ item.xf }} 学分
                        </text>
                        <!-- 课程性质 -->
                        <text class="text-xs text-gray-400">
                            {{ item.kcxzmc }}
                        </text>
                        <!-- 课程性质 -->
                        <text class="text-xs text-gray-400">
                            {{ item.ksxz }}
                        </text>
                    </view>
                </view>
                <view class="w-[72px]">
                    <text class="text-md font-bold">
                        {{ item.bfzcj }}
                    </text>
                    <text class="text-xs font-bold">
                        / {{ item.jd }}
                    </text>
                </view>
            </view>
        </scroll-view>
        <!-- 占位 -->
        <view class="h-6"></view>
    </view>
</template>
