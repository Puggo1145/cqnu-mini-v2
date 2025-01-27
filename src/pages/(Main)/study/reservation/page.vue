<script setup lang="ts">
import cusPage from '@/components/cus-page.vue';
// linkofficial
import { getReservationSysCookie } from '@/utils/link-official';

getReservationSysCookie();
</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <view>
            Hello Reservation
        </view>
    </cus-page>
</template>
