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
        notes: undefined as EasyNoteCard[] | undefined
    }),
    actions: {
        async fetchNotes(params: GetNoteListParams) {
            const data = await getNoteList(params);
            this.notes = data.records;
            console.log(this.notes);
            
        },
        // TODO - 根据课程名称查询小记
        async createNote(data: CreateEasyNote) {
            const res = await createNote(data);
            if (res.success) {
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