<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import profile from './_components/profile.vue';
import functions from './_components/functions.vue';



</script>

<template>
    <cus-page header-type="nav" padding-x="12">
        <profile />
        <functions class="mt-2" />
    </cus-page>
</template>
