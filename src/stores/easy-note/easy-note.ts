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
        total: 0,
        error: false
    }),
    actions: {
        async fetchNotes(params: GetNoteListParams) {
            this.notes = [];

            if (this.total === this.notes.length) {
                uni.showToast({
                    title: '没有更多了',
                    icon: 'none'
                })
                return ;
            }

            const res = await getNoteList(params);
            const { data: { data } } = res;
            this.total = data.total;

            if (res.ok) {
                if (params.current === 1) {
                    this.notes = data.records;
                }else{
                    this.notes = [...this.notes, data.records];
                }
                
            } else {
                this.error = true;
            }
        },
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

            return isSuccess;
        },
        async deleteNote(noteId: number) {
            this.notes = this.notes?.filter(note => note.id !== noteId);
        }
    }
})