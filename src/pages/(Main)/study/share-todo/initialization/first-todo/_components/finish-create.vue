<script setup lang="ts">
// components
import titleDesc from '@/components/title-desc.vue';
import cusButton from '@/components/cus-button.vue';
import cusInput from '@/components/cus-input.vue';
// store
import { useInitalTodo } from '@/stores/share-todo/initial-todo';


const initialTodoStore = useInitalTodo();


const emit = defineEmits(['update:current']);
function prevPage() {
    emit('update:current');
}
</script>

<template>
    <view class="w-full h-full flex flex-col">
        <title-desc
            title="决定好了吗？"
            desc="给你的 Todo List 取一个名字吧！"
        />
        <cus-input 
            class="mt-4" 
            field-name="列表名"
            :value="initialTodoStore.listName"
            @input="e => initialTodoStore.setListName(e.value)"
        />
        <cus-button class="mt-4">
            确定
        </cus-button>
        <cus-button 
            variant="ghost"
            class="mt-4"
            @click="prevPage"
        >
            返回
        </cus-button>
    </view>
</template>
