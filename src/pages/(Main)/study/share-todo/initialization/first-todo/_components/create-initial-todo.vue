<script setup lang="ts">
import { ref, computed } from 'vue';
// components
import cusInput from '@/components/cus-input.vue';
import cusSelect from '@/components/cus-select.vue';
import cusButton from '@/components/cus-button.vue';
import tagSelector from '@/components/tag-selector.vue';
import titleDesc from '@/components/title-desc.vue';
// stores
import { useInitalTodo } from '@/stores/share-todo/initial-todo';
// constants
import { repeatSelections } from '@/constants/share-todo/repeat';
// types
import type { Tag } from '@/components/tag-selector.vue';
import type { CusSelectEvent } from '@/components/cus-select.vue';


const initialTodoStore = useInitalTodo();

const content = computed(() => 
    initialTodoStore.todos[initialTodoStore.currentTodo].content
);
function onContentChange(e: CusSelectEvent) {
    initialTodoStore.setContent(e.value);
}

const remindDate = computed(() => 
    initialTodoStore.todos[initialTodoStore.currentTodo].remindDate
);
function onRemindDateChange(e: CusSelectEvent) {
    initialTodoStore.setRemindDate(e.value);
}

const remindTime = computed(() => 
    initialTodoStore.todos[initialTodoStore.currentTodo].remindTime
);
function onRemindTimeChange(e: CusSelectEvent) {
    initialTodoStore.setRemindTime(e.value);
}


const repeat = computed(() => 
    initialTodoStore.todos[initialTodoStore.currentTodo].repeat
);
function onRepeatChange(e: CusSelectEvent) {
    initialTodoStore.setRepeat(e.value);
}


// TODO - 从服务器获取 tags
const tags = ref<Tag[]>([
    { name: "重要", color: "#df625e" },
    { name: "学习", color: "#5b6ff4" },
    { name: "日常", color: "#5b6ff4" },
]);
const selectedTags = computed(() => 
    initialTodoStore.todos[initialTodoStore.currentTodo].tags
);
function onTagChange(e: Tag[]) {
    initialTodoStore.setTags(e);
}


const emit = defineEmits(['update:current']);
function nextPage() {
    emit('update:current');
}
</script>

<template>
    <view class="w-full h-full pb-5 flex flex-col justify-between">
        <title-desc 
            title="制定你的第一份 Todo" 
            desc="迈向目标的第一步，从认真制定一份计划开始"
        />

        <scroll-view 
            scroll-y
            class="w-full flex-1 mt-6 overflow-hidden mb-4"
        >
            <cus-input
                field-name="计划内容"
                :value="content"
                @input="onContentChange"
            />
            <!-- 提醒日期与时间 -->
            <view class="mt-4 w-full flex items-center justify-between gap-x-4">
                <view class="w-full flex flex-col gap-y-1">
                    <text class="text-sm font-semibold text-secondary-foreground pl-1">
                        提醒日期
                    </text>
                    <cus-select
                        mode="date"
                        :value="remindDate"
                        :start="remindDate"
                        @change="onRemindDateChange"
                    />
                </view>
                <view class="w-full flex flex-col gap-y-1">
                    <text class="text-sm font-semibold text-secondary-foreground pl-1">
                        提醒时间
                    </text>
                    <cus-select
                        mode="time"
                        :value="remindTime"
                        :start="remindTime"
                        @change="onRemindTimeChange"
                    />
                </view>
            </view>
            <!-- todo 是否重复提醒 -->
            <view class="mt-4 w-full flex flex-col gap-y-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-1">
                    重复
                </text>
                <cus-select
                    :value="repeat"
                    :range="repeatSelections"
                    @change="onRepeatChange"
                />
            </view>
            <!-- todo 标签 -->
            <view class="mt-4 w-full flex flex-col gap-y-1">
                <text class="text-sm font-semibold text-secondary-foreground pl-1">
                    标签（点击选择）
                </text>
                <tag-selector
                    class="mt-2"
                    :tags="tags"
                    :selectedTags="selectedTags"
                    @change="onTagChange"
                />
            </view>
        </scroll-view>

        <cus-button
            class="mb-2"
            @click="initialTodoStore.newTodo"
        >
            继续添加
        </cus-button>
        <cus-button
            variant="outline"
            @click="nextPage"
        >
            下一步
        </cus-button>
    </view>
</template>
