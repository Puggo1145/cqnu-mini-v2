<script setup lang="ts">
// components
import todoCard from '../../../_components/todo-card.vue';
// store
import { useInitalTodo } from '@/stores/share-todo/initial-todo';


const initialTodoStore = useInitalTodo();
</script>

<template>
    <view class="px-4 overflow-hidden w-full h-[136px] flex flex-col gap-y-3 justify-center">
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
</template>
