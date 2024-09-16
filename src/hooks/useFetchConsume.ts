import { ref, onMounted, watch } from "vue";
// store
import useUserInfo from "@/stores/user-info";
// link official
import { getConsume } from '@/utils/link-official';
// types
import type { BalanceParams } from "@/utils/link-official/libs/e-card/get-consume";


export default function useFetchConsume() {
    const userInfoStore = useUserInfo();

    const consume = ref(0);
    const isFetching = ref(false);
    const error = ref(false);


    const defaultParams: BalanceParams = {
        timeFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        timeTo: new Date().toISOString().split('T')[0]
    }

    async function fetchConsume(params: BalanceParams = defaultParams) {
        if (!userInfoStore.cardPwd) {
            return;
        }

        isFetching.value = true;
        error.value = false;

        const data = await getConsume(params);
        if (data) {
            consume.value = (data.expenses / 100);
        } else {
            error.value = true;
        }

        isFetching.value = false;
    }

    // onMounted(() => {
    //     fetchConsume();
    // });

    watch(() => userInfoStore.cardPwd, () => {
        fetchConsume();
    });

    return {
        consume,
        isFetching,
        error,
        fetchConsume
    };
}