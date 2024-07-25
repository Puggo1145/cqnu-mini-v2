<script setup lang="ts">
// components
import todoCard from '../../../_components/todo-card.vue';
// store
import { useInitalTodo } from '@/stores/share-todo/initial-todo';


const props = defineProps<{current: number}>();


const initialTodoStore = useInitalTodo();
const todoStatus = (index: number) => {
    if (props.current === 1) {
        return 'w-full';
    } else {
        return index === initialTodoStore.currentTodo ? 'w-full' : 'w-3/4';
    }
}


function switchCurrentTodo(e: any) {
    const { scrollTop } = e.detail;
    const currentTodo = Math.round(scrollTop / 92);
    initialTodoStore.setCurrentTodo(currentTodo);
}
function switchToFirstTodo() {
    initialTodoStore.setCurrentTodo(0);
}
function switchToLastTodo() {
    initialTodoStore.setCurrentTodo(initialTodoStore.todos.length - 1);
}
</script>

<template>
    <view 
        class="px-4 overflow-hidden w-full h-[136px] 
        transition-all duration-500 flex justify-center items-center"
        :class="props.current === 1 && 'h-[320px]'"
    >
        <view :class="[
            'w-full rounded-2xl bg-transparent transition-all duration-500',
            'flex flex-col gap-y-3',
            props.current === 1 && 'bg-white p-4'
        ]">
            <text 
                :class="[
                    'text-2xl font-bold overflow-hidden h-0 transition-all duration-500',
                    props.current === 1 && 'h-7'
                ]"
            >
                {{ initialTodoStore.listName }}
            </text>
            <scroll-view
                class="overflow-hidden w-full h-[136px] transition-all duration-500"
                :class="props.current === 1 && 'h-[200px]'"
                scroll-y
                enable-passive
                upper-threshold="20"
                lower-threshold="20"
                @scroll="switchCurrentTodo"
                @scrolltoupper="switchToFirstTodo"
                @scrolltolower="switchToLastTodo"
            >
                <view class="w-full flex flex-col gap-y-3 justify-center pb-4">
                    <todo-card
                        v-for="todo, index in initialTodoStore.todos"
                        class="origin-top-left transition-all duration-500"
                        :class="todoStatus(index)"
                        :key="index"
                        :content="todo.content"
                        :remindDate="todo.remindDate"
                        :remindTime="todo.remindTime"
                        :tags="todo.tags"
                    />
                </view>
            </scroll-view>
        </view>
    </view>
</template>
