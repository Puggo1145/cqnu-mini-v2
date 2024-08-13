<script setup lang="ts">
import { computed, withDefaults } from 'vue';
// components
import spinner from './spinner.vue'; // TODO 完成 spinner variant

interface Props {
    variant?: "primary" | "secondary" | "muted" | "outline" | "ghost" | 'loading';
    className?: string;
    disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    variant: "primary",
    disabled: false,
    className: "",
});
const isButtonDisabled = computed(() => 
    props.disabled || props.variant === 'loading'
);


const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-secondary-foreground",
    muted: "!bg-muted text-secondary-foreground",
    outline: "border border-primary border-solid text-primary bg-white",
    ghost: '!leading-[32px] text-primary bg-transparent border-none',
    loading: '!bg-muted text-secondary-foreground'
};


const emit = defineEmits(['click']);
</script>

<template>
    <button
        class="flex justify-center items-center min-w-[100px] h-[52px] rounded-2xl text-md font-bold leading-[52px] transition-all"
        :class="[
            variants[props.variant],
            props.className,
        ]" 
        hover-class="button-touch"
        @click="emit('click')"    
        :disabled="isButtonDisabled"
    >
        <spinner 
            v-if="props.variant === 'loading'"
            size="small"
            class="mr-2"
        />
        <slot />
    </button>
</template>

<style scoped>
.button-touch {
    filter: brightness(0.8);
}
</style>