<script setup lang="ts">
import cusPage from '@/components/cus-page.vue';
import dynamicHeader from './_components/dynamic-header.vue';
import tabs from './_components/tabs.vue';
import smartClass from './_components/smart-class.vue';
import easyNote from './_components/easy-note.vue';
</script>

<template>
    <cus-page padding-x="16">
        <dynamic-header />
        <tabs />
        <scroll-view 
            class="mt-4 flex-1 overflow-hidden"
            scroll-y
            enable-back-to-top
            :show-scrollbar="false"
        >
            <smart-class />
            <easy-note />
        </scroll-view>
    </cus-page>
</template>