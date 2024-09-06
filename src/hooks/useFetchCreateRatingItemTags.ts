import { ref, onMounted } from "vue";
// api
import { getCreateRatingItemTags } from "@/api/rating";
// types
import type { Tag } from "@/components/tag-selector.vue";


const useFetchCreateRatingItemTags = () => {
    const tags = ref<Tag[]>([]);
    const isFetching = ref(false);
    const error = ref(false);

    const handleFetchCreateRatingItemTags = async () => {
        isFetching.value = true;
        error.value = false;

        const res = await getCreateRatingItemTags();

        if (res.ok) {
            tags.value = res.data.data;
        } else {
            error.value = true;
        }

        isFetching.value = false;
    }

    onMounted(async () => {
        await handleFetchCreateRatingItemTags();
    })

    return {
        tags,
        isFetching,
        error,
    }
}

export default useFetchCreateRatingItemTags;