// “今日” 课堂小记 全局状态
import { defineStore } from "pinia";
// types
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";


export const useClassEasyNoteStore = defineStore('classEasyNote', {
    state: () => ({
        notes: [] as EasyNoteCard[],
    }),
    actions: {
        async deleteNote(noteId: number) {
            this.notes = this.notes?.filter(note => note.id !== noteId);
        }
    }
})