import request from "@/utils/request";
// types
import type { Tag } from "@/components/tag-selector.vue";
import type { PageResponse } from "@/types/response";
import type { StarRatio } from "@/pages/(Main)/service/rating/item/_components/item-info.vue";
import type { TagRespDto } from "@/pages/(Main)/service/rating/item/_components/item-info.vue";
import type { IRatingItemDetailInfo } from "@/pages/(Main)/service/rating/item/_components/item-info.vue";


type GetCreateRatingItemTagsResponse = {
    0: Tag[]
    1: Tag[]
}
export const getCreateRatingItemTags = async () => {
    const res = await request.GET<GetCreateRatingItemTagsResponse>({
        route: "business/review/v1/get-allDishTags"
    })
        .send();

    return res
}


// 创建评分对象
interface CreateRatingItemParams {
    name: string;
    price: number;
    canteenName: string;
    diningRoom: string;
    imageUrl: string;
    tagId: number;
}
export const createRatingItem = async (params: CreateRatingItemParams) => {
    const res = await request.POST<boolean>({
        route: "business/review/v1/add-dish",
        data: params
    })
        .send();

    return res;
}


// 获取热门菜品对象
export interface RatingItem {
    id: number;
    name: string;
    canteernName: string;
    diningRoom: string;
    imageUrl: string;
    ratingWeight: number;
}

export const getHotRatingItems = async () => {
    const res = await request.GET<RatingItem[]>({
        route: "business/review/v1/hot-dish"
    })
        .send();

    return res;
}


// 获取为你推荐菜品对象
interface GetRecommendRatingItemsParams {
    tagName: string;
    canteenName: string;
    rating: number;
    priceSort: "" | "asc" | "desc";
    current: number;
    pageSize: number;
}
export type FoodItem = {
    id: number;
    name: string;
    userId: string;
    price: number;
    description: string;
    canteenName: string;
    diningRoom: string;
    imageUrl: string;
    createdTime: string;
    updatedTime: string;
    tagList: Tag[];
    ratingCount: number;
    avgRating: number;
    recentRatingCount: number;
    weightRating: number;
};
export const getRecommendRatingItems = async (params: GetRecommendRatingItemsParams) => {
    const res = await request.POST<PageResponse<FoodItem>>({
        route: "business/review/v1/recommend",
        data: params
    })
        .send();

    return res;
}


export type RatingItemDetail = {
    id: number;
    name: string;
    username: string;
    price: number;
    description: string;
    canteenName: string;
    diningRoom: string;
    imageUrl: string;
    starRatio: StarRatio;
    ratingCount: number;
    avgRating: number;
    tagRespDtoList: TagRespDto[];
}
export const getRatingItemDetail = async (dishId: number) => {
    const res = await request.GET<RatingItemDetail>({
        route: `business/review/v1/dish-details?dishId=${dishId}`
    })
        .send();

    return res; 
}
