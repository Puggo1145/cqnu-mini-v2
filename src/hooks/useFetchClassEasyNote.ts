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


    const fetchNotes = async (type: 'load' | 'refresh' = 'load') => {
        if (type === 'refresh') {
            current.value = 1;
            isLoadComplete.value = false;
            classEasyNoteStore.notes = [];
        }


        if (scheduleStore.lessons.length === 0) return;
        if (isLoadComplete.value || isLoading.value) return;

        isLoading.value = true;
        error.value = false;

        const res = await getNoteList({
            current: current.value,
            pageSize: pageSize.value,
            courseName: currentCourseName.value || "",
            tagName: "",
            timespan: "今日内",
        });

        if (res.ok) {
            if (current.value === 1) {
                classEasyNoteStore.notes = res.data.data.noteRespIPage.records;
            } else {
                classEasyNoteStore.notes = [
                    ...notes.value,
                    ...res.data.data.noteRespIPage.records
                ]
            }

            if (res.data.data.totalCount === notes.value.length) {
                isLoadComplete.value = true;
            } else {
                current.value++;
            }
        } else {
            error.value = true;
        }

        isLoading.value = false;
    }

    watch(() => currentCourseName.value, async () => await fetchNotes('refresh'));

    watch(() => scheduleStore.lessons, async () => await fetchNotes('refresh'));


    return {
        easyNotes: notes,
        isLoading,
        error,
        isLoadComplete,
        fetchNotes,
    }
}
