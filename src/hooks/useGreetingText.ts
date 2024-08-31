import { ref, watch, onMounted } from "vue";
import { useCourses } from "./useCourses";
// constants
import greetingTexts from "@/constants/greeting-text";


const useGreetingText = () => {
    const greetingText = ref<string>();
    const { currentTime } = useCourses();

    const getGreetingText = () => {
        const hour = new Date().getHours();

        if (hour < 12) return greetingTexts[0];
        if (hour < 14) return greetingTexts[1];
        if (hour < 18) return greetingTexts[2];
        if (hour < 22) return greetingTexts[3];

        return greetingTexts[4];
    }

    onMounted(() => {
        greetingText.value = getGreetingText();
    })

    watch(currentTime, () => {
        greetingText.value = getGreetingText();
    })

    return { greetingText }
}

export default useGreetingText;
