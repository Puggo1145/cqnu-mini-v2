import { ref, watch, onMounted } from "vue";
// api
import { getRecommendRatingItems } from "@/api/rating";
// store
import { useRatingRecommendationFilters } from "@/stores/rating/recommendation-filters";
// type
import type { FoodItem } from "@/api/rating";


export default function useFetchRecommendRating() {
    const filtersStore = useRatingRecommendationFilters();
    

    const current = ref(1);
    const isFetching = ref(false);
    const error = ref(false);
    const isLoadComplete = ref(false);

    const recommendItems = ref<FoodItem[]>([]);

    const fetchRecommendItems = async () => {
        if (isLoadComplete.value || isFetching.value) return;

        isFetching.value = true;
        error.value = false;
        
        const filters = filtersStore.getFilters();
        const res = await getRecommendRatingItems({
            current: current.value,
            pageSize: 10,
            ...filters
        });

        if (res.ok) {
            if (current.value === 1) {
                recommendItems.value = res.data.data.records;
            } else {
                recommendItems.value = recommendItems.value.concat(res.data.data.records);
            }

            if (res.data.data.total === recommendItems.value.length) {
                isLoadComplete.value = true;
            } else {
                current.value++;
            }
        } else {
            error.value = true;
        }

        isFetching.value = false;
    }

    // 刷新（通常是在筛选条件发生变化后）
    const refresh = async () => {
        current.value = 1;
        recommendItems.value = [];
        isLoadComplete.value = false;

        await fetchRecommendItems();
    }

    watch(() => [
        filtersStore.selectedTag,
        filtersStore.selectedCanteenIndex,
        filtersStore.selectedPriceSortIndex,
        filtersStore.selectedRateIndex
    ], async () => {
        await refresh();
    });

    return {
        isFetching,
        error,
        recommendItems,
        fetchRecommendItems,
        refresh,
        isLoadComplete
    }
}