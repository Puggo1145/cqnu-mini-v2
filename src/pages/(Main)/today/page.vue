<script setup lang="ts">
import cusPage from '@/components/cus-page.vue';
import dynamicHeader from './_components/dynamic-header.vue';
import tabs from './_components/tabs.vue';
import smartClass from './_components/smart-class.vue';
</script>

<template>
    <cus-page padding-x="16">
        <dynamic-header />
        <tabs />
        <view class="mt-4">
            <smart-class />
        </view>
    </cus-page>
</template>
