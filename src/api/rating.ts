import request from "@/utils/request";
// types
import type { Tag } from "@/components/tag-selector.vue";


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