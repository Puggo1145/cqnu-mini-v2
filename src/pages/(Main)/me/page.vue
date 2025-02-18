<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import functions from './_components/functions.vue';

</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <text class="text-3xl font-bold mb-4">个人中心</text>
        <functions class="mt-2" />
    </cus-page>
</template>
