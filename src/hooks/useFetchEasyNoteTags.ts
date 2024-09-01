import { ref, onMounted } from "vue";
// apis
import { getTags } from "@/api/easy-note";
// types
import type { Tag } from "@/api/easy-note";


export default function useFetchEasyNoteTags() {
    const tags = ref<Tag[]>([]);
    const isFetching = ref(false);
    const error = ref(false);

    const getEasyNoteTags = async () => {
        isFetching.value = true;

        const res = await getTags();

        if (res.ok) {
            tags.value = res.data.data
        } else {
            error.value = true;
        }

        isFetching.value = false;
    }

    onMounted(async () => {
        await getEasyNoteTags();
    });

    return {
        tags,
        isFetching,
        error,
    }
}