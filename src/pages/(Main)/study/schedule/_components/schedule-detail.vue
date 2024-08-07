<script setup lang="ts">
export interface Lesson {
  lesson_id: number;
  name: string;
  place: string;
  teacher: string;
  start_time: number;
  end_time: number;
  day: number;
  include_week: number[];
  color: string;
}


// 保留响应性，不能解构
const props = defineProps<{lesson: Lesson | undefined}>();
</script>

<template>
    <view class="w-full flex flex-col px-4">
        <text class="text-2xl font-bold">
            {{ props.lesson?.name }}
        </text>
        <text class="font-bold text-secondary-foreground">
            {{ props.lesson?.place }}
        </text>
        <view class="">

        </view>
    </view>
</template>
