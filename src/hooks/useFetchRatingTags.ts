import { onMounted, ref } from "vue";
// api
import { getCreateRatingItemTags } from "@/api/rating";

export interface RatingTag {
    id: number;
    tagName: string;
    tagType: number;
    category: Category;
    tendency: Tendency | null;
}

// 定义具有倾向性的类别
type CategoryWithTendency = "味道" | "口感";
type CategoryWithoutTendency = "份量" | "外观" | "价格" | "健康";
type Category = CategoryWithTendency | CategoryWithoutTendency;

// 定义倾向类型
type Tendency = "positive" | "negative";

// 定义带有倾向性的分类结构
interface TendencyCategory {
    positive: RatingTag[];
    negative: RatingTag[];
}

// 定义分类后的标签结构
interface ClassifiedTags {
    味道: TendencyCategory;
    口感: TendencyCategory;
    份量: RatingTag[];
    价格: RatingTag[];
    外观: RatingTag[];
    健康: RatingTag[];
}

/**
 * 根据 category 分类标签，category 下再根据 tendency 分类。
 * 如果 tendency 为 null，则直接在 category 下返回标签数组。
 * 
 * @param tags - 标签数组
 * @returns 分类后的标签对象
 */
function classifyTags(tags: RatingTag[]): ClassifiedTags {
    const result: Partial<ClassifiedTags> = {
        味道: { positive: [], negative: [] },
        口感: { positive: [], negative: [] },
        份量: [],
        价格: [],
        外观: [],
        健康: [],
    };

    for (const tag of tags) {
        const { category, tendency } = tag;

        if (category === "味道" || category === "口感") {
            if (tendency) {
                (result[category] as TendencyCategory)[tendency].push(tag);
            }
        } else if (
            category === "份量" ||
            category === "价格" ||
            category === "外观" ||
            category === "健康" 
        ) {
            (result[category] as RatingTag[]).push(tag);
        }
    }

    return result as ClassifiedTags;
}

const useFetchRatingTags = () => {
    const tags = ref<ClassifiedTags | null>(null);
    const isFetching = ref(false);
    const error = ref(false);

    const handleFetchCreateRatingItemTags = async () => {
        isFetching.value = true;
        error.value = false;

        try {
            const res = await getCreateRatingItemTags();

            if (res.ok) {
                const classifiedTags = classifyTags(res.data.data[0]);
                tags.value = classifiedTags;
            } else {
                error.value = true;
            }
        } catch (e) {
            console.error(e);
            error.value = true;
        } finally {
            isFetching.value = false;
        }
    }

    onMounted(async () => {
        await handleFetchCreateRatingItemTags();
    });

    return {
        tags,
        isFetching,
        error,
        handleFetchCreateRatingItemTags
    }
}

export default useFetchRatingTags;
