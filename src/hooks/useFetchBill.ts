import { ref, onMounted, watch } from "vue";
// link official
import { getBill } from "@/utils/link-official/libs/e-card/get-consume";
// types
import type { BillRecord } from "@/utils/link-official/libs/e-card/get-consume";
import type { Ref } from "vue";


interface IUseFetchBill {
    timeFrom: string;
    timeTo: string;
}

export default function useFetchBill(timeRange: Ref<IUseFetchBill>) {
    const bill = ref<BillRecord[]>([]);
    const page = ref(1);
    const error = ref(false);
    const isFetching = ref(false);
    const isLoadComplete = ref(false);

    const fetchBill = async () => {
        if (isFetching.value || isLoadComplete.value) return;

        isFetching.value = true;
        error.value = false;

        const data = await getBill({
            current: page.value,
            size: 10,
            ...timeRange?.value
        });

        if (data) {
            if (page.value === 1) {
                bill.value = data.records;
            } else {
                bill.value = [...bill.value, ...data.records];
            }

            if (data.pages === page.value) {
                isLoadComplete.value = true;
            } else {
                page.value++;
            }
        } else {
            error.value = true;
        }

        isFetching.value = false;
    }

    onMounted(async () => {
        await fetchBill();
    })

    watch(timeRange, async () => {
        page.value = 1;
        isLoadComplete.value = false;

        await fetchBill()
    })

    return {
        bill,
        isFetching,
        error,
        isLoadComplete,
        fetchBill
    }
}