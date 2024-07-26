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
    >
        <overall-grade />
        <view class="mt-4 flex-1 overflow-hidden">
            <term-grade />
        </view>
    </cus-page>
</template>
