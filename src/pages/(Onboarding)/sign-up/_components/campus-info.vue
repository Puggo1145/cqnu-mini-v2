<script setup lang="ts">
import { ref, computed } from 'vue';
// components
import signupTexts from '../_components/signup-texts.vue';
import cusSelect from '@/components/cus-select.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// constans
import { identity, facultiesAndMajors } from '@/constants/signup/campus-info';

const identityIndex = ref<number>(0);
const facultyIndex = ref<number>(0);
const majorsIndex = ref<number>(0);
const selectedFields = ref<string[]>([]);

const faculties = computed(() => facultiesAndMajors.map(({ name }) => name));
const majors = computed(() => {
    const majorsOfFaculty = facultiesAndMajors.find(({ name }) => name === faculties.value[facultyIndex.value])!;

    return identityIndex.value === 0 
        ? majorsOfFaculty?.majorsForUndergraduates
        : majorsOfFaculty?.majorsForPostgraduates;
});

// vue 会在 html 内解构 ref，导致从 html 传入的 ref 失去响应性，只能分别处理
const handleIdentityChange = (event: any) => {
    identityIndex.value = event.value;
    majorsIndex.value = 0;

    if (event.hasSelected) {
        selectedFields.value.push(event.hasSelected);
    }
}
const handleFacultyChange = (event: any) => {
    facultyIndex.value = event.value;
    majorsIndex.value = 0;
    
    if (event.hasSelected) {
        selectedFields.value.push(event.hasSelected);
    }
}
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts title="完善你的校园信息" desc="输入你的学号、学院和专业，以便为你提供更好的服务" />
        <cus-input field-name="学号（13 位）" />
        <cus-select
            field-name="identity"
            placeholder="请选择你的身份"
            :value="identityIndex"
            :range="identity"
            @change="handleIdentityChange"
        />
        <cus-select
            field-name="faculty"
            placeholder="请选择你的学院"
            :value="facultyIndex"
            :range="faculties"
            @change="handleFacultyChange"
        />
        <cus-select
            v-if="selectedFields.length > 1"
            field-name="major"
            placeholder="请选择你的专业"
            :value="majorsIndex"
            :range="majors"
            @change="majorsIndex = $event.value"
        />
        <cus-button variant="muted">
            继续
        </cus-button>
    </view>
</template>