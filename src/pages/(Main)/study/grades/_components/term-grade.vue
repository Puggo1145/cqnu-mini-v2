<script setup lang="ts">
import { ref } from 'vue';
// components
import cusSelect from '@/components/cus-select.vue';
// types
import type { CusSelectEvent } from '@/components/cus-select.vue';


const semesterOptions = ["上", "下"]
const currentSemester = ref(0);
function changeSemester(e: CusSelectEvent) {
    currentSemester.value = e.value;
}

const gradeOptions = ["大一", "大二", "大三", "大四"]
const currentGrade = ref(0);
function changeGrade(e: CusSelectEvent) {
    currentGrade.value = e.value;
}

const transcript = ref([])
</script>

<template>
    <view class="w-full flex flex-col gap-y-3">
        <view class="flex gap-x-2">
            <cus-select
                variant="mini"
                :value="currentGrade"
                :range="gradeOptions"
                @change="changeGrade"
            />
            <cus-select
                variant="mini"
                :value="currentSemester"
                :range="semesterOptions"
                @change="changeSemester"
            />
        </view>
        <view class="w-full min-h-24 p-4 bg-secondary rounded-2xl 
        flex flex-col items-center justify-center">
            <text class="text-sm text-secondary-foreground">
                请选择查询条件
            </text>
        </view>
    </view>
</template>
