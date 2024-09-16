<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';
import noData from '@/components/no-data.vue';
// hooks
import useFetchAnnouncement from '@/hooks/useFetchAnnouncement';


const { announcement } = useFetchAnnouncement();

</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <scroll-view
            class="overflow-hidden flex-1"
            scroll-y
        >
            <no-data
                v-if="!announcement"
                title="网络错误"
                desc="请检查网络连接"
            />
            <title-desc
                v-else
                :title="announcement?.title"
                title-size="medium"
                :desc="announcement?.snippet"
            />
            <text class="text-sm text-secondary-foreground mt-4">
                {{ announcement?.content }}
            </text>
            <view class="h-8" />
        </scroll-view>
    </cus-page>
</template>
