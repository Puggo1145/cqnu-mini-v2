import request from "@/utils/request";
// types
import type { Tag } from "@/components/tag-selector.vue";
import type { MyResponse } from "@/types/response";


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


interface CreateRatingItemParams {
    name: string;
    price: number;
    canteenName: string;
    diningRoom: string;
    imageUrl: string;
    tagId: number;
}
export const createRatingItem = async (params: CreateRatingItemParams) => {
    const res = await request.POST<MyResponse<boolean>>({
        route: "business/review/v1/add-dish",
        data: params
    })
        .send();

    return res;
}
