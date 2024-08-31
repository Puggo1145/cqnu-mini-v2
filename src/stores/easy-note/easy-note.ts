// 班级小记 全局状态
import { defineStore } from "pinia";
// types
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";

export const useEasyNoteStore = defineStore('easyNote', {
    state: () => ({
        notes: [] as EasyNoteCard[],
    }),
    actions: {
        async deleteNote(noteId: number) {
            this.notes = this.notes?.filter(note => note.id !== noteId);
        }
    }
})