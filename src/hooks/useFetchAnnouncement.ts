import { ref, onMounted } from "vue";
// api
import { getAnnouncement } from "@/api/user";
// types
import type { AnnoucementResponse } from "@/api/user";


const useFetchAnnouncement = () => {
    const announcement = ref<AnnoucementResponse>();

    const handleFetchAnnouncement = async () => {
        const res = await getAnnouncement();
        if (res.ok) {
            announcement.value = res.data.data;
        }
    }

    onMounted(async () => {
        await handleFetchAnnouncement();
    })

    return {
        announcement,
    }
};

export default useFetchAnnouncement;