import { onMounted, ref } from "vue";
// store
import { useRatingRecommendationFilters } from "@/stores/rating/recommendation-filters";
// api
import { getCreateRatingItemTags } from "@/api/rating";
// types
import type { Tag } from "@/components/tag-selector.vue";


const useFetchRatingItemTags = () => {
    const ratingRecommendationFilterStore = useRatingRecommendationFilters();

    const tags = ref<Tag[]>([]);
    const isFetching = ref(false);
    const error = ref(false);

    const handleFetchCreateRatingItemTags = async () => {
        isFetching.value = true;
        error.value = false;

        const res = await getCreateRatingItemTags();

        if (res.ok) {
            tags.value = res.data.data[1];
            ratingRecommendationFilterStore.selectedTag = [tags.value[0]];
        } else {
            error.value = true;
        }

        isFetching.value = false;
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

export default useFetchRatingItemTags;