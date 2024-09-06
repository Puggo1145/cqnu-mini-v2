import request from "@/utils/request";
// types
import type { Tag } from "@/components/tag-selector.vue";


export const getCreateRatingItemTags = async () => {
    const res = await request.GET<Tag[]>({
        route: "business/review/v1/get-allDishTags"
    })
        .send();

    return res
}