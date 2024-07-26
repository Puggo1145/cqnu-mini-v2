<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import overallGrade from './_components/overall-grade.vue';
import termGrade from './_components/term-grade.vue';
</script>

<template>
    <cus-page 
        header-type="nav" 
        padding-x="16" 
        class-name="gap-y-8"
    >
        <overall-grade />
        <view class="flex flex-col gap-y-2">
            <text class="ml-2 font-bold text-2xl">
                学期成绩
            </text>
            <term-grade />
        </view>
    </cus-page>
</template>
