<script setup lang="ts">
import cusPage from '@/components/cus-page.vue';
import spinner from '@/components/spinner.vue';
import cusButton from '@/components/cus-button.vue';
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <cus-button class-name="flex items-center gap-2"> 
            <spinner size="small" color="white" />
            测试
        </cus-button>
    </cus-page>
</template>

