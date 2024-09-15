import { ref } from "vue";
// api
import { getHotRatingItems } from "@/api/rating";
// types
import type { RatingItem } from "@/api/rating";

export default function useFetchRatingHot() {
    const isFething = ref(false);
    const error = ref<boolean>(false);

    const hotRatingItem = ref<RatingItem[]>([]);

    const fetchHotRatingItem = async () => {
        isFething.value = true;

        const res = await getHotRatingItems();
        if (res.ok) {
            hotRatingItem.value = res.data.data;
        } else {
            error.value = true;
        }

        isFething.value = false;
    }


    return {
        isFething,
        error,
        hotRatingItem,
        fetchHotRatingItem
    }
}