import type { TodoForm } from "@/pages/(Main)/study/share-todo/_components/create-share-todo.vue"

export const tags = [
    '重要',
    '学习',
    '日常'
]

export const mockShareTodos: TodoForm[] = [
    {
        content: '吃饭',
        reminderDate: '2024-07-01',
        remindertime: '10:14',
        recur: '',
        tag: ['重要'],
    },
    {
        content: '睡觉',
        reminderDate: '2024-07-17',
        remindertime: '12:10',
        recur: '',
        tag: ['日常'],
    }
]