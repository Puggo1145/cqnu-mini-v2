import { ref } from "vue";
// api
import { getRatingItemDetail } from "@/api/rating";
// types
import type { RatingItemDetail } from "@/api/rating";


export default function useFetchRatingItemDetails() {
    const ratingItemDetail = ref<RatingItemDetail>();
    const error = ref(false);

    const fetchRatingItemDetail = async (id: number) => {
        error.value = false;
        uni.showLoading({ title: "加载中" });

        const res = await getRatingItemDetail(id);

        if (res.ok) {
            ratingItemDetail.value = res.data.data;
        } else {
            error.value = true;
        }

        uni.hideLoading();
    }

    return {
        error,
        ratingItemDetail,
        fetchRatingItemDetail
    }
}