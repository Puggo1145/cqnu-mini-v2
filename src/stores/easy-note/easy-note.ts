// 班级小记 全局状态
import { defineStore } from "pinia";
// api
import { getNoteList, createNote } from "@/api/easy-note";
// types
import type { EasyNoteCard } from "@/pages/(Main)/study/easy-note/_components/easy-note-card.vue";
import type { GetNoteListParams } from "@/api/easy-note";
import type { CreateEasyNote } from "@/api/easy-note";


export const useEasyNoteStore = defineStore('easyNote', {
    state: () => ({
        notes: undefined as EasyNoteCard[] | undefined,
        error: false
    }),
    actions: {
        async fetchNotes(params: GetNoteListParams) {
            this.notes = undefined;

            const res = await getNoteList(params);
            if (res.ok) {
                this.notes = res.data.data.records;
            } else {
                this.error = true;
            }
        },
        async createNote(data: CreateEasyNote) {
            const isSuccess = await createNote(data);
            console.log(isSuccess);
            
            if (isSuccess) {
                await this.fetchNotes({
                    current: 1,
                    pageSize: 10,
                    tagName: "",
                    timespan: ""
                });
            }

            return isSuccess;
        },
        async deleteNote(noteId: number) {
            this.notes = this.notes?.filter(note => note.id !== noteId);
        }
    }
})