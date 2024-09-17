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
    const total = ref(0);
    const isFetching = ref(false);
    const error = ref(false);
    const isLoadComplete = ref(false);

    const recommendItems = ref<FoodItem[]>([]);

    const fetchRecommendItems = async () => {
        if (isLoadComplete.value || isFetching.value) return;

        isFetching.value = true;
        error.value = false;
        
        const filters = filtersStore.getFilters();

        // 推荐 item 的组成为：8 条严格符合查询条件的 item + 2 条符合其他条件但评分为 0 的 item
        // 1. 获取 8 条严格符合查询条件的 item
        const strictRes = await getRecommendRatingItems({
            current: current.value,
            pageSize: 8,
            ...filters
        });

        const noRateRes = await getRecommendRatingItems({
            current: current.value,
            pageSize: 2,
            ...filters,
            rating: 0
        });

        if (strictRes.ok && noRateRes.ok) {
            if (current.value === 1) {
                // 1. 计算 total
                total.value = strictRes.data.data.total + noRateRes.data.data.total;
                recommendItems.value = [...strictRes.data.data.records, ...noRateRes.data.data.records];
            } else {
                // recommendItems.value = recommendItems.value.concat(res.data.data.records);
                recommendItems.value = [...recommendItems.value, ...strictRes.data.data.records, ...noRateRes.data.data.records];
            }

            // console.log('has:' + recommendItems.value.length, 'total: ' + total.value);
            
            if (total.value === recommendItems.value.length) {
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