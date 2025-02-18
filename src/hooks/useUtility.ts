import { ref, onMounted, watch, computed } from "vue";
import useUserInfo from "@/stores/user-info";
// linkOfficial
import { getCardInfo, getUtilityBalance } from '@/utils/link-official';


interface UtilityBalance {
    electricity: number;
    water: number | null;
}
const useUtility = () => {
    const userInfoStore = useUserInfo();
    const studentId = computed(() => userInfoStore.studentId);
    const dormitory = computed(() => userInfoStore.dormitory);
    const roomNumber = computed(() => userInfoStore.roomNumber);

    const isFetchingBalance = ref(false);
    const error = ref(false);
    const balance = ref<UtilityBalance>({
        electricity: 0,
        water: 0
    });

    async function queryUtility() {
        if (!studentId.value || !dormitory.value || !roomNumber.value) {
            return
        };

        isFetchingBalance.value = true;

        const eCardId = await getCardId();

        const res = await getUtilityBalance({
            eCardId: eCardId,
            dormitoryName: dormitory.value,
            roomNumber: roomNumber.value
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
                return ecardId;
            }
        }

        return userInfoStore.ecardId!;
    }

    onMounted(() => {
        queryUtility();
    })
    watch([dormitory, roomNumber], () => {
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
