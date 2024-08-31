import { ref, onMounted, watch, computed } from "vue";
// hooks
import { useCourses } from "./useCourses";
// store
import { useClassEasyNoteStore } from "@/stores/easy-note/class-easy-note";
import { useSchedule } from "@/stores/useSchedule";
// apis
import { getNoteList } from "@/api/easy-note";


export default function useFetchClassEasyNote() {
    const scheduleStore = useSchedule();
    const classEasyNoteStore = useClassEasyNoteStore();
    const notes = computed(() => classEasyNoteStore.notes);
    
    const { currentCourseName } = useCourses();

    const current = ref(1);
    const pageSize = ref(5);
    const isLoading = ref(false);
    const error = ref(false);
    const isLoadComplete = ref(false);


    const fetchNotes = async () => {
        if (isLoadComplete.value || isLoading.value) return;

        isLoading.value = true;
        error.value = false;

        const res = await getNoteList({
            current: current.value,
            pageSize: pageSize.value,
            courseName: currentCourseName.value!,
            tagName: "",
            timespan: "今日内",
        });

        if (res.ok) {
            classEasyNoteStore.notes = [
                ...classEasyNoteStore.notes,
                ...res.data.data.records
            ];

            if (res.data.data.total === notes.value.length) {
                isLoadComplete.value = true;
            } else {
                current.value++;
            }
        } else {
            error.value = true;
        }

        isLoading.value = false;
    }


    onMounted(async () => {
        // 今日无课，显示今天的小记
        if (scheduleStore.lessons.length === 0) return;
    
        await fetchNotes();
    })

    watch(() => currentCourseName.value, async () => {
        current.value = 1;
    
        await fetchNotes();
    })

    watch(() => scheduleStore.lessons, async () => {
        current.value = 1;
    
        await fetchNotes();
    })


    return {
        easyNotes: notes,
        isLoading,
        error,
        isLoadComplete,
        refresh: fetchNotes
    }
}
