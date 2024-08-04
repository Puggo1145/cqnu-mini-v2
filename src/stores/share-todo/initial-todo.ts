import { defineStore } from "pinia";
// utils
import {
    getCurrentTime,
    getDate
} from "@/utils/timeHandler";
// types
import type { Tag } from "@/components/tag-selector.vue";


type InitialTodo = {
    content: string | null,
    remindDate: string,
    remindTime: string,
    repeat: number,
    tags: Tag[],
}


export const useInitalTodo = defineStore('initialTodo', {
    state: () => ({
        currentTodo: 0,
        listName: "我的第一份 Todo",
        todos: [
            {
                content: null,
                remindDate: getDate(),
                remindTime: getCurrentTime(),
                repeat: 0,
                tags: [],
            }
        ] as InitialTodo[]
    }),
    actions: {
        newTodo() {
            this.$state.todos.unshift({
                content: null,
                remindDate: getDate(),
                remindTime: getCurrentTime(),
                repeat: 0,
                tags: [],
            });
        },
        setCurrentTodo(index: number) {
            this.currentTodo = index;
        },
        setContent(content: string) {
            this.$state.todos[this.currentTodo].content = content;
        },
        setRemindDate(date: string) {
            this.$state.todos[this.currentTodo].remindDate = date;
        },
        setRemindTime(time: string) {
            this.$state.todos[this.currentTodo].remindTime = time;
        },
        setRepeat(repeat: number) {
            this.$state.todos[this.currentTodo].repeat = repeat;
        },
        setTags(tags: Tag[]) {
            this.$state.todos[this.currentTodo].tags = tags;
        },
        setListName(name: string) {
            this.listName = name;
        }
    }
});