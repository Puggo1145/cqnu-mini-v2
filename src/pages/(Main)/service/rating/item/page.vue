<script setup lang="ts">
import { onMounted } from 'vue';
import { onShow } from '@dcloudio/uni-app';
// components
import cusPage from '@/components/cus-page.vue';
import itemContent from './_components/item-content.vue';
import itemInfo from './_components/item-info.vue';
import itemSeparator from './_components/item-separator.vue';
import itemReport from './_components/item-report.vue';
import noData from '@/components/no-data.vue';
// hooks
import useFetchRatingItemDetails from '@/hooks/useFetchRatingItemDetail';


const {
    error,
    ratingItemDetail,
    fetchRatingItemDetail
} = useFetchRatingItemDetails();


async function fetchData() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];

    // @ts-expect-error uniapp 没有标注 options 类型
    if (currentPage.options.id) {
        // @ts-expect-error uniapp 没有标注 options 类型
        await fetchRatingItemDetail(currentPage.options.id);
    }
}

onMounted(async () => {
    await fetchData();
})
onShow(async () => {
    await fetchData();
})
</script>

<template>
    <cus-page header-type="nav">
        <scroll-view
            class="h-full overflow-hidden"
            scroll-y
        >
            <no-data
                v-if="error"
                class-name="pt-24"
                title="没有网络"
                desc="请检查网络连接"
                :action="fetchData"
                action-text="重试"
            />

            <image
                v-if="ratingItemDetail"
                :src="ratingItemDetail.imageUrl"
                class="w-full h-[300px] bg-secondary"
            />
            <item-content v-if="ratingItemDetail">
                <item-info :item-detail="ratingItemDetail" />
                <item-separator />
                <item-report />
            </item-content>
        </scroll-view>
    </cus-page>
</template>
