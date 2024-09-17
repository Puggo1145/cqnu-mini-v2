import { ref, computed, watch } from "vue";
// store
import { useSchedule } from "@/stores/useSchedule";
import { useEasyNoteStore } from "@/stores/easy-note/easy-note";
import { useEasyNoteFilters } from "@/stores/easy-note/easy-note-filters";
// api
import { getNoteList } from "@/api/easy-note";



export default function useFetchEasyNote() {
    const scheduleStore = useSchedule();
    const easyNoteFiltersStore = useEasyNoteFilters();

    const easyNoteStore = useEasyNoteStore();
    const notes = computed(() => easyNoteStore.notes);


    const current = ref(1);
    const pageSize = ref(5);
    const isLoading = ref(false);
    const error = ref(false);
    const isLoadComplete = ref(false);

    async function fetchNotes(type: 'load' | 'refresh' = 'load') {
        if (type === 'refresh') {
            current.value = 1;
            isLoadComplete.value = false;
            easyNoteStore.notes = [];
        }

        if (isLoadComplete.value || isLoading.value) return;
        if (scheduleStore.lessons.length === 0) return;

        isLoading.value = true;
        error.value = false;

        const res = await getNoteList({
            current: current.value,
            pageSize: pageSize.value,
            ...easyNoteFiltersStore.getFilterValues()
        });

        if (res.ok) {
            if (current.value === 1) {
                easyNoteStore.notes = res.data.data.noteRespIPage.records;
            } else {
                easyNoteStore.notes = [
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

    watch(
        [
            () => easyNoteFiltersStore.timespan,
            () => easyNoteFiltersStore.courseName,
            () => easyNoteFiltersStore.tag,
            () => scheduleStore.lessons
        ],
        async () => await fetchNotes('refresh')
    );

    return {
        easyNotes: notes,
        isLoading,
        error,
        isLoadComplete,
        fetchNotes,
    }
}
