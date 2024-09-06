import { ref, onMounted } from "vue";
// api
import { getAnnouncement } from "@/api/user";


const useFetchAnnouncement = () => {
    const content = ref<string | null>(null);
    const error = ref(false);

    const handleFetchAnnouncement = async () => {
        const res = await getAnnouncement();
        if (res.ok) {
            content.value = res.data.data.content;
        } else {
            error.value = true;
        }
    }

    onMounted(async () => {
        await handleFetchAnnouncement();
    })

    return {
        content,
        error,
    }
};

export default useFetchAnnouncement;