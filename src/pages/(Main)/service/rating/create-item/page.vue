<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';
import imageUploader from '@/components/image-uploader.vue';
import cusSelect from '@/components/cus-select.vue';
import cusInput from '@/components/cus-input.vue';
import tagSelector from '@/components/tag-selector.vue';
import cusButton from '@/components/cus-button.vue';
// constants
import { baseConfigs } from '@/constants/baseConfig';
// static
import icons from '@/constants/icons';


const selectedCanteenIndex = ref(0);
const mockTags = [
    {
        id: 1,
        tagName: '米饭'
    },
    {
        id: 2,
        tagName: '面食'
    }
]

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
            <view class="h-full flex flex-col gap-y-3">
                <title-desc
                    title="创建美食"
                    desc="在此处创建一个评分对象，为保证美食信息的完整性，您需要上传美食图片"
                    class="mt-3"
                />
                <image-uploader class="mt-3">
                    <view class="w-full h-[180px] bg-secondary flex items-center justify-center rounded-2xl">
                        <image
                            :src="icons.image"
                            class="size-8"
                        />
                    </view>
                </image-uploader>
                <cus-select
                    field-name="食堂"
                    :value="selectedCanteenIndex"
                    :range="baseConfigs.canteens"
                    placeholder="请选择食堂或商业街"
                    @change="e => selectedCanteenIndex = e.value"
                />
                <cus-input field-name="商家名" />
                <cus-input field-name="美食名" />
                <cus-input field-name="价格（元）" />
                <view class="flex flex-col gap-y-2 pb-8">
                    <text class="ml-1 text-sm font-bold text-secondary-foreground">
                        类型（可选）
                    </text>
                    <tag-selector :tags="mockTags" />
                </view>
            </view>
        </scroll-view>
        <cus-button class="mb-6">
            创建
        </cus-button>
    </cus-page>
</template>
