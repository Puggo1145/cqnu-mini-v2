import { defineStore } from "pinia";

export type Option = {
    label: string;
    value: string | number;
}
type RatingRecommendationFilters = {
    canteenOptions: Option[];
    priceSortOptions: Option[];
    rateOptions: Option[];
    
    selectedCanteenIndex: number | null;
    selectedPriceSortIndex: number | null;
    selectedRateIndex: number | null;
}

export const useRatingRecommendationFilters = defineStore('ratingRecommendationFilters', {
    state: () => ({
        canteenOptions: [],
        priceSortOptions: [
            { label: "价格由高到低", value: "desc" },
            { label: "价格由低到高", value: "asc" }
        ],
        rateOptions: [
            { label: "5星好评", value: 5 },
            { label: "4星以上", value: 4 },
        ],
        
        selectedTagIndex: null,
        selectedPriceSortIndex: null,
        selectedRateIndex: null
    })
})