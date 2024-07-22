<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import visualTodo from './_components/visual-todo.vue';
import createTodo from './_components/create-todo.vue';


const current = ref(0);
</script>

<template>
    <cus-page header-type="nav">
        <visual-todo />
        <swiper 
            class="size-full"
            :current="current"
        >
            <swiper-item class="box-border px-4">
                <create-todo />
            </swiper-item>
        </swiper>
    </cus-page>
</template>
