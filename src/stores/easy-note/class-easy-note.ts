// “今日” 课堂小记 全局状态
import { defineStore } from "pinia";
// api
import { getNoteList } from "@/api/easy-note";
// types
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";
import type { GetNoteListParams } from "@/api/easy-note";


export const useClassEasyNoteStore = defineStore('classEasyNote', {
    state: () => ({
        currentCourse: null as string | null,
        notes: undefined as EasyNoteCard[] | undefined,
        error: false
    }),
    actions: {
        // 课堂小记只获取当前课程的小记
        async fetchNotes(params: GetNoteListParams) {
            const res = await getNoteList(params);
            if (res.ok) {
                this.notes = res.data.data.records;
            } else {
                this.error = true;
            }
        },
    }
})