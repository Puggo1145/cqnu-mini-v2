import { ref, onMounted, watch } from "vue";
import useUserInfo from "@/stores/user-info";
// linkOfficial
import { getCardInfo, getUtilityBalance } from '@/utils/link-official';


interface UtilityBalance {
    electricity: number;
    water: number | null;
}
const useUtility = () => {
    const userInfoStore = useUserInfo();

    const isFetchingBalance = ref(false);
    const error = ref(false);
    const balance = ref<UtilityBalance>({
        electricity: 0,
        water: 0
    });

    async function queryUtility() {
        if (!userInfoStore.studentId || !userInfoStore.dormitory || !userInfoStore.roomNumber) {
            return
        };

        isFetchingBalance.value = true;

        const eCardId = await getCardId();

        const res = await getUtilityBalance({
            eCardId: eCardId,
            dormitoryName: userInfoStore.dormitory,
            roomNumber: userInfoStore.roomNumber
        });
        if (res.ok) {
            balance.value = res.data.data
        } else {
            error.value = true;
        }

        isFetchingBalance.value = false;
    }

    async function getCardId() {
        if (!userInfoStore.ecardId) {
            const res = await getCardInfo(userInfoStore.studentId!);

            if (res.ok) {
                const ecardId = res.data.data[0].account;
                userInfoStore.setUserInfo({
                    ecardId: ecardId
                });
            }

        }

        return userInfoStore.ecardId!;
    }

    onMounted(() => {
        queryUtility();
    })
    watch(() => userInfoStore.dormitory, () => {
        queryUtility();
    })

    return { 
        balance, 
        isFetchingBalance, 
        error,
        queryUtility
    }
}

export default useUtility;
