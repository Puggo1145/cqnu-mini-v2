<script setup lang="ts">
import { computed, withDefaults } from 'vue';


export type Tag = {
    id: number;
    tagName: string;
    tagType?: number;
}

type TagSelectionMode = {
    mode: 'single';
    selectedTags: Tag;
} | {
    mode: 'multiple';
    selectedTags: Tag[];
}

interface TagSelectorProps {
    tags: Tag[];
    mode: 'single' | 'multiple';
    selectedTags?: Tag[];
    isFetching?: boolean | null;
    error?: boolean | null;
}
const props = withDefaults(defineProps<TagSelectorProps>(), {
    selectedTags: () => [],
    mode: 'multiple',
    isFetching: null,
    error: null,
});


const selectedTags = computed(() => props.selectedTags);


const emit = defineEmits(['change']);
function selectTag(tag: Tag) {
    if (props.mode === 'single') {
        emit('change', tag);
        return;
    } else {
        const updatedTags = props.selectedTags.some(stag => stag.id === tag.id)
            ? props.selectedTags.filter(stag => stag.id !== tag.id)
            : [...props.selectedTags, tag];

        emit('change', updatedTags);
    }
}
</script>

<template>
    <view class="w-full flex items-center gap-x-2">
        <text
            v-if="props.isFetching !== null && props.isFetching"
            class="ml-2 text-secondary-foreground text-sm"
        >
            正在加载标签
        </text>

        <text
            v-else-if="props.error !== null && props.error"
            class="ml-2 text-destructive text-sm"
        >
            标签获取失败
        </text>

        <view
            v-else
            v-for="tag in props.tags"
            :key="tag.id"
            :class="['flex items-center justify-center rounded-full px-4 py-2',
                selectedTags.some(stag => stag.id === tag.id) ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'
            ]"
            @click="selectTag(tag)"
        >
            <text class="font-bold text-sm">
                {{ tag.tagName }}
            </text>
        </view>
    </view>
</template>
