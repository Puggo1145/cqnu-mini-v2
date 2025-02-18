<script setup lang="ts">
import { ref } from 'vue';
// components
import cusInput from './cus-input.vue';
import cusSelect from './cus-select.vue';
import cusButton from './cus-button.vue';
// constants
import { baseConfigs } from '@/constants/baseConfig';
// types
import type { Lesson } from '@/stores/useSchedule';
import type { CusInputEvent } from '@/components/cus-input.vue';

interface Props {
  initialData?: Partial<Lesson>;
  onClose: () => void;
  onSubmit: (lesson: Omit<Lesson, 'lesson_id' | 'isLocal'>) => void;
}

const props = defineProps<Props>();

const name = ref(props.initialData?.name || '');
const place = ref(props.initialData?.place || '');
const teacher = ref(props.initialData?.teacher || '');
const day = ref(props.initialData?.day || 1);
const startTime = ref(props.initialData?.start_time || 1);
const endTime = ref(props.initialData?.end_time || 1);
const startWeek = ref(props.initialData?.include_week?.[0] || 0);
const endWeek = ref(props.initialData?.include_week?.[props.initialData.include_week.length - 1] || 0);

const weekOptions = Array.from({ length: baseConfigs.totalWeeks }, (_, i) => i + 1);
const startTimeOptions = [
  { label: "8:30", value: 1 },
  { label: "9:25", value: 2 },
  { label: "10:30", value: 3 },
  { label: "11:25", value: 4 },
  { label: "14:30", value: 5 },
  { label: "15:25", value: 6 },
  { label: "16:30", value: 7 },
  { label: "17:25", value: 8 },
  { label: "19:30", value: 9 },
  { label: "20:25", value: 10 }
];

const endTimeOptions = [
  { label: "9:15", value: 1 },
  { label: "10:10", value: 2 },
  { label: "11:15", value: 3 },
  { label: "12:10", value: 4 },
  { label: "15:15", value: 5 },
  { label: "16:10", value: 6 },
  { label: "17:15", value: 7 },
  { label: "18:10", value: 8 },
  { label: "20:15", value: 9 },
  { label: "21:10", value: 10 }
];

const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

function handleSubmit() {
  if (!name.value || !place.value) {
    uni.showToast({
      title: '请输入课程名称和上课地点',
      icon: 'none'
    });
    return;
  }
  
  // 生成周次数组
  const weeks = Array.from(
    { length: endWeek.value - startWeek.value + 1 }, 
    (_, i) => startWeek.value + i
  );

  props.onSubmit({
    name: name.value,
    place: place.value,
    teacher: teacher.value,
    day: day.value,
    start_time: startTime.value,
    end_time: endTime.value,
    include_week: weeks,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16)
  });
  
  props.onClose();
}

function handleNameInput(e: CusInputEvent) {
  name.value = e.value;
}

function handlePlaceInput(e: CusInputEvent) {
  place.value = e.value;
}

function handleTeacherInput(e: CusInputEvent) {
  teacher.value = e.value;
}

function handleDayChange(e: any) {
  // 直接使用选择的索引 + 1 作为星期几
  day.value = e.value + 1;
}

function handleStartTimeChange(e: any) {
  startTime.value = e.value + 1;
  // 如果结束时间小于开始时间，自动调整结束时间
  if (endTime.value < startTime.value) {
    endTime.value = startTime.value;
  }
}

function handleEndTimeChange(e: any) {
  endTime.value = e.value + 1;
  // 如果结束时间小于开始时间，自动调整开始时间
  if (endTime.value < startTime.value) {
    startTime.value = endTime.value;
  }
}
</script>

<template>
  <scroll-view
    class="overflow-hidden pb-4 flex flex-col gap-4 h-[70vh]"
    scroll-y
  >
    <view class="mt-3 flex flex-col gap-2">
      <cusInput
        field-name="课程名称"
        :value="name"
        @input="handleNameInput"
      />
    </view>

    <view class="mt-3 flex flex-col gap-2">
      <cusInput
        field-name="上课地点"
        :value="place"
        @input="handlePlaceInput"
      />
    </view>

    <view class="mt-3 flex flex-col gap-2">
      <cusInput
        field-name="任课教师"
        :value="teacher"
        @input="handleTeacherInput"
      />
    </view>

    <view class="mt-3 flex flex-col gap-2">
      <text class="text-sm text-secondary-foreground">星期</text>
      <cusSelect
        field-name="星期"
        :value="day"
        :range="weekDays"
        @change="handleDayChange"
      />
    </view>

    <view class="mt-3 flex flex-col gap-2">
      <text class="text-sm text-secondary-foreground">上课时间</text>
      <view class="flex gap-2 items-center">
        <text class="text-sm text-secondary-foreground">从</text>
        <cusSelect
          class="min-w-[140px]"
          field-name="开始节数"
          :value="startTime - 1"
          :range="startTimeOptions"
          range-key="label"
          @change="handleStartTimeChange"
        />
        <text class="text-sm text-secondary-foreground">到</text>
        <cusSelect
          class="min-w-[140px]"
          field-name="结束节数"
          :value="endTime - 1"
          :range="endTimeOptions"
          range-key="label"
          @change="handleEndTimeChange"
        />
      </view>
    </view>

    <view class="mt-3 flex flex-col gap-2">
      <text class="text-sm text-secondary-foreground">上课周次</text>
      <view class="flex gap-2 items-center">
        <text class="text-sm text-secondary-foreground">从第</text>
        <cusSelect
          class="min-w-[120px]"
          field-name="起始周"
          :value="startWeek"
          :range="weekOptions"
          @change="e => startWeek = e.value"
        />
        <text class="text-sm text-secondary-foreground">周</text>
        <text class="text-sm text-secondary-foreground">到第</text>
        <cusSelect
          class="min-w-[120px]"
          field-name="结束周"
          :value="endWeek"
          :range="weekOptions"
          @change="e => endWeek = e.value"
        />
        <text class="text-sm text-secondary-foreground">周</text>
      </view>
    </view>

    <view class="mt-3">
      <cusButton @click="handleSubmit">
        保存
      </cusButton>
    </view>
  </scroll-view>
</template>