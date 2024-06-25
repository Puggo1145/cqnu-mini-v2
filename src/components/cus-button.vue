<script setup lang="ts">
import { computed } from 'vue';
// components
import spinner from './spinner.vue';

interface Props {
    variant?: "primary" | "secondary" | "muted" | "outline" | "ghost";
    className?: string;
    disabled?: boolean;
}
const props = defineProps<Props>();

const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-secondary-foreground",
    muted: "!bg-muted text-secondary-foreground",
    outline: "border border-primary border-solid text-primary bg-white",
    ghost: '!h-[32px] !leading-[32px] text-primary bg-transparent border-none'
};
const buttonStyle = computed(() => {
    return  variants[props.variant || "primary"] + " " + props.className;
});

const emit = defineEmits(['click']);
</script>

<template>
    <button
        class="flex justify-center items-center h-[52px] rounded-2xl text-md font-bold leading-[52px] transition-all"
        :class="buttonStyle" 
        hover-class="button-touch"
        @click="emit('click')"    
        :disabled="props.disabled"
    >
        <slot />
    </button>
</template>

<style scoped>
.button-touch {
    filter: brightness(0.8);
}
</style>