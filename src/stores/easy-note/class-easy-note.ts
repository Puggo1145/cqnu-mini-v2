// “今日” 课堂小记 全局状态
import { defineStore } from "pinia";
// api
import { getNoteList, createNote } from "@/api/easy-note";
// types
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";
import type { GetNoteListParams } from "@/api/easy-note";
import type { CreateEasyNote } from "@/api/easy-note";


export const useClassEasyNoteStore = defineStore('classEasyNote', {
    state: () => ({
        notes: undefined as EasyNoteCard[] | undefined,
        error: false
    }),
    actions: {
        async fetchNotes(params: GetNoteListParams) {
            const res = await getNoteList(params);
            if (res.ok) {
                this.notes = res.data.data.records;
            } else {
                this.error = true;
            }
        },
        // TODO - 根据课程名称查询小记
        async createNote(data: CreateEasyNote) {
            const isSuccess = await createNote(data);
            if (isSuccess) {
                await this.fetchNotes({
                    current: 1,
                    pageSize: 10,
                    tagName: "",
                    timespan: ""
                });
            }
        }
    }
})