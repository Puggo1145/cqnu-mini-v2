import { ref, onMounted } from "vue";
// api
import { getAnnouncement } from "@/api/user";
// types
import type { AnnoucementResponse } from "@/api/user";


const useFetchAnnouncement = () => {
    const announcement = ref<AnnoucementResponse>();
    const isFetching = ref(false);

    const handleFetchAnnouncement = async () => {
        isFetching.value = true;

        const res = await getAnnouncement();
        if (res.ok) {
            announcement.value = res.data.data;
        }

        isFetching.value = false;
    }

    onMounted(async () => {
        await handleFetchAnnouncement();
    })

    return {
        isFetching,
        announcement,
    }
};

export default useFetchAnnouncement;