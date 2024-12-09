<script setup lang="ts">
import { ref, computed } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import cusButton from '@/components/cus-button.vue';
import titleDesc from '@/components/title-desc.vue';
import rater from './_components/rater.vue';
import ratingTagCategory from './_components/rating-tag-category.vue';
import tagSelector from '@/components/tag-selector.vue';
import spinner from '@/components/spinner.vue';
import statusBox from '../../_components/status-box.vue';
import noData from '@/components/no-data.vue';
// hooks
import useFetchRatingTags from '@/hooks/useFetchRatingTags';
// api
import { submitRating } from '@/api/rating';
// type
import type { RatingTag } from '@/hooks/useFetchRatingTags';


const {
    tags,
    isFetching,
    error,
    handleFetchCreateRatingItemTags
} = useFetchRatingTags();

const selectedTasteTags = ref<RatingTag[]>([]);
const selectedTextureTags = ref<RatingTag[]>([]);
const selectedPortionTags = ref<RatingTag[]>([]);
const selectedPriceTags = ref<RatingTag[]>([]);
const selectedAppearanceTags = ref<RatingTag[]>([]);
const selectedHealthTags = ref<RatingTag[]>([]);


const rating = ref<number>(0);
function setRating(value: number) {
    rating.value = value;
}


function getDishId(): number | undefined {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];

    // @ts-expect-error uniapp 没有标注 options 类型
    if (currentPage.options.id) {
        // @ts-expect-error uniapp 没有标注 options 类型
        return currentPage.options.id;
    }
}

const isRequiredTagsSelected = ref(true);
const isSubmitting = ref(false);
async function onSubmit() {
    if (rating.value === 0) {
        uni.showToast({
            title: '请先评分',
            icon: 'none',
            duration: 1200
        })
        return;
    }

    if (!(selectedTasteTags.value.length > 0 || selectedTextureTags.value.length > 0)) {
        isRequiredTagsSelected.value = false;
        return;
    } else {
        isRequiredTagsSelected.value = true;
    }


    const dishId = getDishId();
    if (!dishId) {
        uni.showToast({
            title: '获取美食 ID 失败',
            icon: 'none',
            duration: 1200
        })
        return;
    }


    isSubmitting.value = true;

    const collectedTags = [
        ...selectedTasteTags.value,
        ...selectedTextureTags.value,
        ...selectedPortionTags.value,
        ...selectedPriceTags.value,
        ...selectedAppearanceTags.value,
        ...selectedHealthTags.value
    ];
    const res = await submitRating({
        dishId: dishId,
        score: rating.value,
        dishTags: collectedTags
    })

    if (res.ok) {
        uni.showToast({
            title: '评分成功',
            icon: 'success',
            duration: 1200
        })

        setTimeout(() => {
            uni.navigateBack();
        }, 1500);
    }

    isSubmitting.value = false;
}
</script>

<template>
    <cus-page
        header-type="nav"
        padding-x="16"
    >
        <view class="overflow-hidden h-full flex flex-col gap-y-6">
            <title-desc
                title="创建评分"
                desc="我们鼓励真实的评价，您的评价将帮助其他同学更好地了解该美食"
            />
            <rater
                :rating="rating"
                @change="val => setRating(val)"
            />

            <view>
                <title-desc
                    title="标签"
                    title-size="medium"
                    desc="请从下方选择您认为与该美食相关的标签"
                />
                <text
                    v-if="!isRequiredTagsSelected"
                    class="text-destructive font-bold text-sm"
                >
                    请从味道或口感中至少选择一个标签
                </text>
            </view>

            <status-box v-if="isFetching">
                <spinner size="medium" />
            </status-box>

            <status-box v-if="error">
                <no-data
                    title="标签获取失败"
                    desc="请检查您的网络连接并重试"
                    :action="handleFetchCreateRatingItemTags"
                    action-text="重试"
                />
            </status-box>

            <scroll-view
                v-if="tags"
                class="overflow-hidden flex-1"
                scroll-y
            >
                <rating-tag-category title="味道">
                    <tag-selector
                        :tags="tags['味道'].positive"
                        :selected-tags="selectedTasteTags"
                        @change="val => selectedTasteTags = val"
                    />
                    <tag-selector
                        v-if="rating < 4 && rating > 0"
                        :tags="tags['味道'].negative"
                        :selected-tags="selectedTasteTags"
                        @change="val => selectedTasteTags = val"
                    />
                </rating-tag-category>
                <rating-tag-category title="口感">
                    <tag-selector
                        :tags="tags['口感'].positive"
                        :selected-tags="selectedTextureTags"
                        @change="val => selectedTextureTags = val"
                    />
                    <tag-selector
                        v-if="rating < 4 && rating > 0"
                        :tags="tags['口感'].negative"
                        :selected-tags="selectedTextureTags"
                        @change="val => selectedTextureTags = val"
                    />
                </rating-tag-category>
                <rating-tag-category title="份量">
                    <tag-selector
                        :tags="tags['份量']"
                        :selected-tags="selectedPortionTags"
                        @change="val => selectedPortionTags = val"
                    />
                </rating-tag-category>
                <rating-tag-category title="价格">
                    <tag-selector
                        :tags="tags['价格']"
                        :selected-tags="selectedPriceTags"
                        @change="val => selectedPriceTags = val"
                    />
                </rating-tag-category>
                <rating-tag-category title="外观">
                    <tag-selector
                        :tags="tags['外观']"
                        :selected-tags="selectedAppearanceTags"
                        @change="val => selectedAppearanceTags = val"
                    />
                </rating-tag-category>
                <rating-tag-category title="健康">
                    <tag-selector
                        :tags="tags['健康']"
                        :selected-tags="selectedHealthTags"
                        @change="val => selectedHealthTags = val"
                    />
                </rating-tag-category>
                <view class="h-4" />
            </scroll-view>
        </view>
        <cus-button
            class="pb-6"
            @click="onSubmit"
            :disabled="isSubmitting"
            :variant="isSubmitting ? 'loading' : 'primary'"
        >
            提交评分
        </cus-button>
    </cus-page>
</template>
