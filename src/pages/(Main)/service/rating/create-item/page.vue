<script setup lang="ts">
import { ref, watch } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import titleDesc from '@/components/title-desc.vue';
import imageUploader from '@/components/image-uploader.vue';
import cusSelect from '@/components/cus-select.vue';
import cusInput from '@/components/cus-input.vue';
import tagSelector from '@/components/tag-selector.vue';
import cusButton from '@/components/cus-button.vue';
// hooks
import useFetchCreateRatingItemTags from '@/hooks/useFetchCreateRatingItemTags';
// constants
import { baseConfigs } from '@/constants/baseConfig';
// static
import icons from '@/constants/icons';
// types
import type { Tag } from '@/components/tag-selector.vue';


// 选中的图片
const selectedFoodImage = ref<string>();

// 选择食堂或商业街
const selectedCanteenIndex = ref(0);

// 填写商家名
const merchantName = ref('');
const merchantNameRef = ref();

// 填写美食名
const foodName = ref('');
const foodNameRef = ref();

// 填写价格
const price = ref('');
const priceRef = ref();

// 选择标签
const { tags, isFetching, error } = useFetchCreateRatingItemTags();
const selectedTag = ref<Tag[]>([]);

// form
function handleSubmitFoos() {

}
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
                <image-uploader
                    :max-count="1"
                    @select="e => selectedFoodImage = (e as string)"
                    class="mt-3"
                >
                    <view
                        class="relative overflow-hidden w-full h-[180px] bg-secondary flex items-center justify-center rounded-2xl"
                    >
                        <image
                            :src="icons.image"
                            class="size-8"
                        />
                        <image
                            v-if="selectedFoodImage"
                            :src="selectedFoodImage"
                            class="w-full h-full absolute"
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
                <cus-input
                    ref="merchantNameRef"
                    field-name="商家名"
                    :value="merchantName"
                    @input="e => merchantName = e.value"
                />
                <cus-input
                    ref="foodNameRef"
                    field-name="美食名"
                    :value="foodName"
                    @input="e => foodName = e.value"
                />
                <cus-input
                    ref="priceRef"
                    field-name="价格（元）"
                    :value="price"
                    @input="e => price = e.value"
                />
                <view class="flex flex-col gap-y-2 pb-8">
                    <text class="ml-1 text-sm font-bold text-secondary-foreground">
                        类型（可选）
                    </text>
                    <tag-selector
                        mode="single"
                        :tags="tags"
                        :selected-tags="selectedTag"
                        :is-fetching="isFetching"
                        :error="error"
                        @change="tag => selectedTag = tag"
                    />
                </view>
            </view>
        </scroll-view>
        <cus-button class="mb-6">
            创建
        </cus-button>
    </cus-page>
</template>
