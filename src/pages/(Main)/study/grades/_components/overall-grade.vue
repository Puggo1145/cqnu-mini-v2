<script setup lang="ts">
import { ref, onMounted } from 'vue';
// linkOfficial
import { getOverallGrade } from '@/utils/link-official';


interface StudyDetail {
    name: string;
    count: string;
}
const gpa = ref<string>("获取中");
const studyDetails = ref<StudyDetail[]>([
    { name: "未通过", count: "-" },
    { name: "未修", count: "-" },
    { name: "在读", count: "-" },
    { name: "通过", count: "-" },
])

onMounted(async () => {
    const res = await getOverallGrade();
    if (res) {
        gpa.value = res.gpa;
        studyDetails.value = res.studyDetail;
    } else {
        gpa.value = "--";
    }
})
</script>

<template>
    <view class="w-full flex gap-x-3">
        <view class="w-full p-4 pr-2 rounded-2xl bg-primary flex flex-col justify-between">
            <text class="text-primary-foreground text-sm font-bold">
                平均学分绩点（GPA）
            </text>
            <view>
                <text class="text-primary-foreground font-bold text-3xl">
                    {{ gpa }}
                </text>
                <text class="text-primary-foreground font-bold text-sm">
                    / 5
                </text>
            </view>
        </view>
        <view class="w-full h-full p-4 pr-0 bg-secondary rounded-2xl grid grid-cols-2 grid-rows-2 gap-2">
            <view
                v-for="studyDetail in studyDetails"
                :key="studyDetail.name"
                class="w-12 flex flex-col items-center"
            >
                <text class="font-bold">
                    {{ studyDetail.count }}
                </text>
                <text class="text-sm text-secondary-foreground">
                    {{ studyDetail.name }}
                </text>
            </view>
        </view>
    </view>
</template>
