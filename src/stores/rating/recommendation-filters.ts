import { defineStore } from "pinia";
// constants
import { baseConfigs } from "@/constants/baseConfig";
// type
import type { Tag } from "@/components/tag-selector.vue";


export type Option = {
    label: string;
    value: string | number;
}
type RatingRecommendationFilters = {
    canteenOptions: string[];
    priceSortOptions: Option[];
    ratingOptions: Option[];

    selectedTag: Tag[];
    selectedCanteenIndex: number;
    selectedPriceSortIndex: number;
    selectedRateIndex: number;
}

export const useRatingRecommendationFilters = defineStore('ratingRecommendationFilters', {
    state: () => ({
        canteenOptions: ["所有食堂", ...baseConfigs.canteens],
        priceSortOptions: [
            { label: '全部', value: "" },
            { label: '价格从高到低', value: "desc" },
            { label: '价格从低到高', value: "asc" },
        ],
        ratingOptions: [
            { label: '4分高分', value: 4 },
            { label: '5分好评', value: 5 },
        ],

        selectedTag: [],
        selectedCanteenIndex: 0,
        selectedPriceSortIndex: 0,
        selectedRateIndex: 0,
    }) as RatingRecommendationFilters,
    actions: {
        getFilters() {
            const formattedCanteenName = this.canteenOptions[this.selectedCanteenIndex] === "所有食堂" ? "" : this.canteenOptions[this.selectedCanteenIndex];

            return {
                tagName: this.selectedTag[0].tagName,
                canteenName: formattedCanteenName,
                priceSort: this.priceSortOptions[this.selectedPriceSortIndex].value as "" | "asc" | "desc",
                rating: this.ratingOptions[this.selectedRateIndex].value as number
            }
        }
    }
})