<script setup lang="ts">
// components
import todoCard from '../../../_components/todo-card.vue';
// store
import { useInitalTodo } from '@/stores/share-todo/initial-todo';


const props = defineProps<{current: number}>();


const initialTodoStore = useInitalTodo();
</script>

<template>
    <view 
        class="px-4 overflow-hidden w-full h-[136px] 
        transition-all duration-500 flex justify-center items-center"
        :class="props.current === 1 && 'h-[386px]'"
    >
        <view :class="[
            'w-full p-4 rounded-2xl bg-transparent transition-all duration-500',
            'flex flex-col gap-y-3',
            props.current === 1 && 'bg-white'
        ]">
            <text 
                :class="[
                    'text-2xl font-bold overflow-hidden h-0 transition-all duration-500',
                    props.current === 1 && 'h-7'
                ]"
            >
                {{ initialTodoStore.listName }}
            </text>
            <view class="w-full flex flex-col gap-y-3 justify-center">
                <todo-card
                    v-for="todo, index in initialTodoStore.todos"
                    class="origin-left"
                    :class="index === 0 ? 'scale-100' : 'scale-75'"
                    :key="index"
                    :content="todo.content"
                    :remindDate="todo.remindDate"
                    :remindTime="todo.remindTime"
                    :tags="todo.tags"
                />
            </view>
        </view>
    </view>
</template>
