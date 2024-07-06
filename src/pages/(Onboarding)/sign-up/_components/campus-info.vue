<script setup lang="ts">
import { ref, computed } from 'vue';
// components
import signupTexts from '../_components/signup-texts.vue';
import cusSelect from '@/components/cus-select.vue';
import cusInput from '@/components/cus-input.vue';
import cusButton from '@/components/cus-button.vue';
// constans
import { identity, facultiesAndMajors } from '@/constants/signup/campus-info';
import { campusInfoTexts } from '@/constants/signup/signup-texts';
// stores
import { useSignupInfo } from '@/stores/signup-info';


const inputValue = ref('');
const inputRef = ref();
const identitySelectRef = ref();
const facultySelectRef = ref();
const majorSelectRef = ref();
const selectedFields = ref<(string | null)[]>([null, null, null]);
const isMajorShow = computed(() => {
    return selectedFields.value[0] === 'identity' && selectedFields.value[1] === 'faculty'
});


const identityIndex = ref<number>(0);
const facultyIndex = ref<number>(0);
const majorsIndex = ref<number>(0);


// 处理学院和专业的数据，根据选择的学院来显示对应的专业
const faculties = computed(() => facultiesAndMajors.map(({ name }) => name));
const majors = computed(() => {
    const majorsOfFaculty = facultiesAndMajors.find(({ name }) => name === faculties.value[facultyIndex.value])!;

    return identityIndex.value === 0 
        ? majorsOfFaculty?.majorsForUndergraduates
        : majorsOfFaculty?.majorsForPostgraduates;
});


const stores = useSignupInfo();
const handleInput = (event: any) => {
    stores.studentId = event.value;
    inputValue.value = event.value;
    inputRef.value.showError('');
}
// vue 会在 html 内解构 ref，导致从 html 传入的 ref 失去响应性，只能分别处理每一种表单
const handleIdentityChange = (event: any) => {
    identityIndex.value = event.value;
    stores.identity = event.value;
    
    if (isMajorShow.value) {
        majorsIndex.value = 0;
        stores.major = majors.value[0];
    }

    if (event.hasSelected) {
        identitySelectRef.value.showError('');
        selectedFields.value[0] = 'identity';
    }
}
const handleFacultyChange = (event: any) => {
    facultyIndex.value = event.value;
    stores.faculty = faculties.value[event.value];
    
    if (isMajorShow.value) {
        majorsIndex.value = 0;
        stores.major = majors.value[0];
    }

    if (event.hasSelected) {
        facultySelectRef.value.showError('');
        selectedFields.value[1] = 'faculty';
    }
}
const handleMajorChange = (event: any) => {
    majorsIndex.value = event.value;
    stores.major = majors.value[event.value];

    if (event.hasSelected) {
        majorSelectRef.value.showError('');
        selectedFields.value[2] = 'major';
    }
}


const emit = defineEmits(['update:current']);
const validateValue = () => {
    // 检查 input
    const isInputLengthCorrect = inputValue.value.length === 13;
    const isInputNumbers = Number.isInteger(Number(inputValue.value));
    if (!isInputLengthCorrect) {
        return inputRef.value.showError('请输入 13 位学号');
    } else if (!isInputNumbers) {
        return inputRef.value.showError('学号只能包含数字');
    }

    // 检查是否选择了所有 picker
    selectedFields.value[0] === null 
    && identitySelectRef.value.showError('请选择身份');
    
    selectedFields.value[1] === null 
    && facultySelectRef.value.showError('请选择学院');
    
    if (isMajorShow.value) {
        selectedFields.value[2] === null 
        && majorSelectRef.value.showError('请选择专业');
    }

    if (selectedFields.value.includes(null)) return;

    inputRef.value.showError('');  // 清除错误信息
    emit('update:current');
}
</script>

<template>
    <view class="flex flex-col gap-6">
        <signup-texts 
            :title="campusInfoTexts.title" 
            :desc="campusInfoTexts.desc" 
        />
        <cus-input 
            ref="inputRef"
            field-name="学号（13 位）"
            @input="handleInput" 
        />
        <cus-select
            ref="identitySelectRef"
            field-name="identity"
            placeholder="请选择你的身份"
            :value="identityIndex"
            :range="identity"
            @change="handleIdentityChange"
        />
        <cus-select
            ref="facultySelectRef"
            field-name="faculty"
            placeholder="请选择你的学院"
            :value="facultyIndex"
            :range="faculties"
            @change="handleFacultyChange"
        />
        <cus-select
            v-if="isMajorShow"
            ref="majorSelectRef"
            field-name="major"
            placeholder="请选择你的专业"
            :value="majorsIndex"
            :range="majors"
            @change="handleMajorChange"
        />
        <cus-button
            @click="validateValue"
        >
            继续
        </cus-button>
    </view>
</template>