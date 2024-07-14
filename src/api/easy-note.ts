import request from "@/utils/request";
// types
import type { MyResponse, PageResponse } from "@/types/response";
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";

// 获取分页小记
export const getNoteList = async (
    current: number,
    pageSize: number,
    tagName: string,
    queryType: string
) => {
    const res = await request.POST<PageResponse<EasyNoteCard>>({
        route: "note/v1/page/note",
        data: {
            current,
            pageSize,
            tagName,
            queryType
        }
    })
        .send();

    return res.data
}

// 获取小记标签
export interface Tag {
    id: number;
    tagName: string;
}
export const getTags = async () => {
    const res = await request.POST<Tag[]>({
        route: "tag/v1/listTag"
    })
        .send();

    return res.data
}

// 创建小记
type OmitParams = "id" | "tags" | "openid" | "seeNumber" | "supportNumber" | "username"
type CreateEasyNote = Omit<EasyNoteCard, OmitParams> & { tagsIds: number[] }
export const createNote = async (note: CreateEasyNote) => {
    const res = await request.POST<MyResponse<boolean>>({
        route: "note/v1/addNote",
        data: note
    })
        .send();

    return { success: res.success };
}
