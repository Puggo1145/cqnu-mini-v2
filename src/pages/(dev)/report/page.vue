<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';
import noData from '@/components/no-data.vue';
import spinner from '@/components/spinner.vue';
// hooks
import useFetchAnnouncement from '@/hooks/useFetchAnnouncement';


const { isFetching, announcement } = useFetchAnnouncement();

</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <view 
            v-if="isFetching"
            class="w-full flex items-center justify-center"
        >
            <spinner size="medium" />
        </view>
        <no-data
            v-if="!isFetching && !announcement"
            title="网络错误"
            desc="请检查网络连接"
        />
        <title-desc
            v-if="announcement"
            :title="announcement?.title"
            title-size="medium"
            :desc="announcement?.snippet"
        />
        <text class="mt-4 text-sm text-secondary-foreground">
            {{ announcement?.content }}
        </text>
    </cus-page>
</template>
