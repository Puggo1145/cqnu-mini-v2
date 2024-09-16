<script setup lang="ts">
// components
import cusPage from '@/components/cus-page.vue';
import itemHeader from './_components/item-header.vue';
import itemContent from './_components/item-content.vue';
import itemInfo from './_components/item-info.vue';
import itemSeparator from './_components/item-separator.vue';
import itemReport from './_components/item-report.vue';
</script>

<template>
    <cus-page header-type="none">
        <scroll-view
            class="h-full overflow-hidden"
            scroll-y
        >
            <up-sticky
                z-index="20"
                class="pt-8"
                bg-color="#fbf9f8"
            >
                <item-header />
            </up-sticky>
            <image
                src=""
                class="w-full h-[300px] bg-secondary"
            />
            <item-content>
                <item-info
                    name="红烧牛肉面"
                    :price="14"
                    username="张三"
                    canteenName="二食堂"
                    diningRoom="重庆江湖"
                    :tagRespDtoList="[
                        {
                            id: 0,
                            tagName: '面食',
                            tagType: 1,
                            category: ''
                        }
                    ]"
                    :star-ratio="{
                        '5.0': 97.1,
                        '4.0': 96.8,
                        '3.0': 1.8,
                        '2.0': 2.9,
                        '1.0': 1.1
                    }"
                    :avg-rating="4.9"
                    :rating-count="100"
                />
                <item-separator />
                <item-report />
            </item-content>
        </scroll-view>
    </cus-page>
</template>
