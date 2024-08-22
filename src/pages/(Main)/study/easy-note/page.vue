<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import easyNoteHeader from './_components/easy-note-header.vue';
import easyNoteStatistic from './_components/easy-note-statistic.vue';
import easyNoteFilter from './_components/easy-note-filter.vue';
// static
import icons from '@/constants/icons';
import { onPullDownRefresh } from '@dcloudio/uni-app';

onPullDownRefresh(() => {
    console.log("刷新了！")
    // 调用接口或者其他处理
    // ....
    setTimeout(function () {
        uni.stopPullDownRefresh();
    }, 3000);
})

</script>

<template>
    <cus-page header-type="nav" padding-x="16">
        <cus-input :icon="icons.search" placeholder="查找小记" />
        <easy-note-header />
        <easy-note-statistic />
        <view class="mt-6 flex-1 overflow-hidden">
            <easy-note-filter />
        </view>
    </cus-page>
</template>
