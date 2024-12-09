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
// zod
import { ZodError, z } from "zod";
// api
import { uploadImages } from "@/api/oss";
import { createRatingItem } from '@/api/rating';
import { checkRatingItem } from '@/api/rating';
// hooks
import useCreateRatingItem from '@/hooks/useCreateRatingItem';
import useFetchRatingItemTags from '@/hooks/useFetchRatingItemTags';
// constants
import { baseConfigs } from '@/constants/baseConfig';
// utils
import compressImages from '@/utils/imageCompressor';
// static
import icons from '@/constants/icons';
// types
import type { Tag } from '@/components/tag-selector.vue';


// 选择标签
const { 
    tags, 
    isFetching, 
    error,
} = useFetchRatingItemTags();
const selectedTag = ref<Tag[]>([]);

// 创建评分对象
const {
    selectedFoodImage,
    selectedCanteenIndex,
    merchantName,
    merchantNameRef,
    foodName,
    foodNameRef,
    price,
    priceRef,
} = useCreateRatingItem();

const isUploading = ref(false);

const createRatingItemSchema = z.object({
    selectedFoodImage: z.string(),
    selectedCanteenIndex: z.number(),
    merchantName: z.string().min(1).max(16),
    foodName: z.string().min(1).max(16),
    price: z.number().min(1).max(1000),
    tagId: z.number()
});
const handleSubmitRatingItem = async () => {
    isUploading.value = true;

    try {
        
        
        // 检查表单数据是否完整
        const checkedForm = createRatingItemSchema.parse({
            selectedFoodImage: selectedFoodImage.value,
            selectedCanteenIndex: selectedCanteenIndex.value,
            merchantName: merchantName.value,
            foodName: foodName.value,
            price: Number(price.value),
            tagId: selectedTag.value[0]?.id,
        });

        // 1. 检查菜品是否已经存在
        const res = await checkRatingItem({
            name: foodName.value,
            canteenName: baseConfigs.canteens[selectedCanteenIndex.value],
            diningRoom: merchantName.value,
        });
        if (res.ok) {
            if (res.data.data) {
                uni.showToast({
                    title: "美食已存在，跳转到此美食",
                    icon: "none",
                    duration: 1500
                });

                setTimeout(() => {
                    uni.redirectTo({
                        url: `/pages/(Main)/service/rating/item/page?id=${res.data.data}`
                    });
                }, 1200);

                return;
            }
        }

        // 2. 压缩图片
        const compressedImage = await compressImages(checkedForm.selectedFoodImage);

        // 3. 上传图片
        const imgUrl = await uploadImages({
            uploadFile: compressedImage,
            bucket: "cqnu-v2-img",
            objectName: "rating-item",
        });
        if (!imgUrl) return;


        // 4. 创建评分对象
        const createRatingItemRes = await createRatingItem({
            name: checkedForm.foodName,
            price: checkedForm.price,
            canteenName: baseConfigs.canteens[checkedForm.selectedCanteenIndex],
            diningRoom: checkedForm.merchantName,
            imageUrl: imgUrl,
            tagId: selectedTag.value[0]?.id,
        });

        // 5. 创建成功，跳转到创建的评分对象详情页
        if (createRatingItemRes.ok) {
            uni.showToast({
                title: "创建成功",
                icon: "success",
                duration: 1500
            })

            setTimeout(() => {
                uni.redirectTo({
                    url: `/pages/(Main)/service/rating/item/page?id=${createRatingItemRes.data.data}`
                });
            }, 1500);
        };
    } catch (err) {
        if (err instanceof ZodError) {
            err.errors.forEach(error => {
                const errorTarget = error.path[0];

                if (errorTarget === 'selectedFoodImage') {
                    uni.showToast({ title: "请上传美食图片", icon: 'none', duration: 1200 })
                } else if (errorTarget === 'merchantName') {
                    merchantNameRef.value.showError("商家名长度应为 1-16 个字符");
                } else if (errorTarget === 'foodName') {
                    foodNameRef.value.showError("美食名长度应为 1-16 个字符");
                } else if (errorTarget === 'price') {
                    priceRef.value.showError("价格应在 1-1000 之间");
                } else if (errorTarget === 'tagId') {
                    uni.showToast({ title: "请选择标签", icon: 'none', duration: 1200 })
                }
            })
        }
    } finally {
        isUploading.value = false;
    }
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
                    ref="selectedCanteenIndexRef"
                    field-name="食堂"
                    :value="selectedCanteenIndex"
                    :range="baseConfigs.canteens"
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
        <cus-button
            class="mb-6"
            @click="handleSubmitRatingItem"
            :variant="isUploading ? 'loading' : 'primary'"
            :disabled="isUploading"
        >
            创建
        </cus-button>
    </cus-page>
</template>
