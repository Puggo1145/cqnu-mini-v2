<script setup lang="ts">
import { ref, onMounted } from 'vue';
// components
import spinner from '@/components/spinner.vue';
// linkOfficial
import { getOverallGrade } from '@/utils/link-official';

interface StudyDetail {
    name: string;
    count: string;
}

const gpa = ref<string>();
const error = ref(false);
const isLoading = ref(true);
const studyDetails = ref<StudyDetail[]>([
    { name: "未通过", count: "-" },
    { name: "未修", count: "-" },
    { name: "在读", count: "-" },
    { name: "通过", count: "-" },
]);

async function fetchGrade() {
    isLoading.value = true;
    error.value = false;

    try {
        const res = await getOverallGrade();
        if (res) {
            gpa.value = res.gpa;
            studyDetails.value = res.studyDetail;
        } else {
            throw new Error('Failed to fetch grade');
        }
    } catch (err) {
        error.value = true;
        gpa.value = "--";
    } finally {
        isLoading.value = false;
    }
}

onMounted(fetchGrade);

function handleClick() {
    if (error.value) {
        fetchGrade();
    }
}
</script>

<template>
    <view
        class="w-full flex gap-x-3"
        @click="handleClick"
    >
        <view class="w-full p-4 pr-2 rounded-2xl bg-primary flex flex-col justify-between">
            <text class="text-primary-foreground text-sm font-bold">
                平均学分绩点（GPA）
            </text>
            <view v-if="isLoading">
                <spinner color="white" />
            </view>
            <view v-else-if="error">
                <text class="text-primary-foreground font-bold">
                    请点击重试
                </text>
            </view>
            <view v-else>
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
