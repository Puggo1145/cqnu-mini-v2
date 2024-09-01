<script setup lang="ts">
import { onMounted } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusInput from '@/components/cus-input.vue';
import easyNoteHeader from './_components/easy-note-header.vue';
import easyNoteStatistic from './_components/easy-note-statistic.vue';
import easyNoteFilter from './_components/easy-note-filter.vue';
import notes from './_components/notes.vue';
// static
import icons from '@/constants/icons';
// store
import useFetchEasyNote from '@/hooks/useFetchEasyNote';


const {
    easyNotes,
    isLoading,
    error,
    isLoadComplete,
    refresh,
} = useFetchEasyNote();

// uniapp 的页面会在 mount 后缓存，mount 在页面存在的整个生命周期内只会触发一次
// 但 composables 会在每次页面显示时 mount，会带来不必要的数据请求
// 所以将数据请求提取到页面层级进行初始化
onMounted(async () => {
    await refresh();
});
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <cus-input
            :icon="icons.search"
            placeholder="查找小记"
        />
        <easy-note-header />
        <easy-note-statistic />
        <view class="mt-4 flex-1 overflow-hidden flex flex-col">
            <easy-note-filter />
            <view class="mt-4 flex-1 overflow-hidden">
                <notes
                    :notes="easyNotes"
                    :isLoading="isLoading"
                    :error="error"
                    :isLoadComplete="isLoadComplete"
                    :refresh="refresh"
                />
            </view>
        </view>
    </cus-page>
</template>
