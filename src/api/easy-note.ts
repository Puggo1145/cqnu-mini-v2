import request from "@/utils/request";
// types
import type { MyResponse, PageResponse } from "@/types/response";
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";


// 获取分页小记
export interface GetNoteListParams {
    current: number;
    pageSize: number;
    timespan?: string; // 截止时间范围
    courseName?: string; // 课程名称
    tagName?: string; // 小记标签名
}
export const getNoteList = async (params: GetNoteListParams) => {
    const res = await request.POST<PageResponse<EasyNoteCard>>({
        route: "note/v1/page/note",
        data: params
    })
        .send();

    return res
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

    return res
}

// 创建小记
type OmitParams = "id" | "tagList" | "openid" | "seeNumber" | "supportNumber" | "username"
export type CreateEasyNote = Omit<EasyNoteCard, OmitParams> & { tagIds: number[] }
export const createNote = async (note: CreateEasyNote) => {
    const res = await request.POST<MyResponse<boolean>>({
        route: "note/v1/addNote",
        data: note
    })
        .send();

    return res
}
