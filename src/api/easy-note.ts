import request from "@/utils/request";
// types
import type { EasyNotePageResponse } from "@/types/response";
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";
import type { Tag } from "@/components/tag-selector.vue";


// 获取分页小记
export interface GetNoteListParams {
    timespan?: string; // 截止时间范围
    courseName?: string | any[]; // 课程名称
    current: number;
    pageSize: number;
    tagName?: string | any[]; // 小记标签名
}
export const getNoteList = async (params: GetNoteListParams) => {
    const res = await request.POST<EasyNotePageResponse<EasyNoteCard>>({
        route: "note/v1/page/note",
        data: params
    })
        .send();

    return res
}


export interface EasyNoteStatistics {
    allCount: number | undefined;
    importanceCount: number | undefined;
    weekCount: number | undefined;
}
export const getNoteStatistics = async () => {
    const res = await request.GET<EasyNoteStatistics>({
        route: "note/v1/count"
    })
        .send();

    if (res.ok) {
        return res.data.data;
    }
}


// 获取小记标签
export const getTags = async () => {
    const res = await request.POST<Tag[]>({
        route: "note/tag/v1/listTag"
    })
        .send();

    return res
}


// 创建小记
type OmitParams = "id" | "tagList" | "openid" | "seeNumber" | "supportNumber" | "username"
export type CreateEasyNote = Omit<EasyNoteCard, OmitParams> & { tagIds: number[] }
export const createNote = async (note: CreateEasyNote) => {
    const res = await request.POST<boolean>({
        route: "note/v1/addNote",
        data: note
    })
        .send();

    return res.ok
}


// 支持小记
enum supportStatus {
    SUPPORT = 1,
    CANCEL = 0
}
export const supportNote = async (
    noteId: number,
    userId: string,
    status: supportStatus
) => {
    const res = await request.POST<boolean>({
        route: "note/v1/like",
        data: {
            noteId,
            userId,
            status
        }
    })
        .send();

    return res.ok
}

// 删除小记
export const deleteNote = async (id: number) => {
    const res = await request.POST<boolean>({
        route: "note/v1/del",
    })
        .useParams({ id })
        .send();

    return res.ok
}
