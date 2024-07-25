<script setup lang="ts">
import { ref } from 'vue';
// components
import cusPage from '@/components/cus-page.vue';
import visualTodo from './_components/visual-todo.vue';
import createInitialTodo from './_components/create-initial-todo.vue';
import finishCreate from './_components/finish-create.vue';


const current = ref(0);

const nextPage = () => current.value += 1
const prevPage = () => current.value -= 1
const getCurrent = (e: any) => current.value = e.detail.current;
</script>

<template>
    <cus-page header-type="nav">
        <visual-todo :current="current" />
        <swiper 
            class="size-full"
            :current="current"
            @change="getCurrent"
        >
            <swiper-item class="box-border px-4">
                <create-initial-todo @update:current="nextPage" />
            </swiper-item>
            <swiper-item class="box-border px-4">
                <finish-create @update:current="prevPage" />
            </swiper-item>
        </swiper>
    </cus-page>
</template>
