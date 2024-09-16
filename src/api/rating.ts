import request from "@/utils/request";
// types
import type { Tag } from "@/components/tag-selector.vue";
import type { PageResponse } from "@/types/response";
import type { StarRatio } from "@/pages/(Main)/service/rating/item/_components/item-info.vue";
import type { TagRespDto } from "@/pages/(Main)/service/rating/item/_components/item-info.vue";
import type { RatingTag } from "@/hooks/useFetchRatingTags";


type GetCreateRatingItemTagsResponse = {
    0: RatingTag[]
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
    const res = await request.POST<number>({
        route: "business/review/v1/add-dish",
        data: params
    })
        .send();

    return res;
}


// 检查评分对象是否重复
interface CheckRatingItemParams {
    name: string;
    canteenName: string;
    diningRoom: string;
}
export const checkRatingItem = async (params: CheckRatingItemParams) => {
    const res = await request.GET<boolean>({
        route: `business/review/v1/check?name=${params.name}&canteenName=${params.canteenName}&diningRoom=${params.diningRoom}`,
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


// 获取评分对象详情
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
    typeTag: TagRespDto[];
}
export const getRatingItemDetail = async (dishId: number) => {
    const res = await request.GET<RatingItemDetail>({
        route: `business/review/v1/dish-details?dishId=${dishId}`
    })
        .send();

    return res; 
}


// 提交评分
interface ISubmitRatingParams {
    dishId: number;
    score: number;
    dishTags: RatingTag[];
}
export const submitRating = async (params: ISubmitRatingParams) => {
    const res = await request.POST({
        route: "business/review/v1/rating",
        data: params
    })
        .send();

    return res;
}
