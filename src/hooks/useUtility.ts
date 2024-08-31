import { ref, onMounted, watch } from "vue";
import useUserInfo from "@/stores/user-info";
// linkOfficial
import { getCardInfo, getUtilityBalance } from '@/utils/link-official';
// api
import { updateUserInfo } from '@/api/user';


interface UtilityBalance {
    electricity: number;
    water: number | null;
}
const useUtility = () => {
    const userInfo = useUserInfo();

    const isFetchingBalance = ref(false);
    const balance = ref<UtilityBalance>({
        electricity: 0,
        water: 0
    });

    async function queryUtility() {
        isFetchingBalance.value = true;

        if (!userInfo.studentId || !userInfo.dormitory || !userInfo.roomNumber) {
            isFetchingBalance.value = false;
            return
        };

        const eCardId = await getCardId();

        const res = await getUtilityBalance({
            eCardId: eCardId,
            dormitoryName: userInfo.dormitory,
            roomNumber: userInfo.roomNumber
        });
        if (res.ok) {
            balance.value = res.data.data
        }

        isFetchingBalance.value = false;
    }

    async function getCardId() {
        if (!userInfo.ecardId) {
            const res = await getCardInfo(userInfo.studentId!);

            if (res.ok) {
                const ecardId = res.data.data[0].account;

                // 将 ecardId update 到 user info
                await updateUserInfo({
                    openid: userInfo.openid!,
                    ecardId: ecardId
                });

                return ecardId;
            }

        }

        return userInfo.ecardId!;
    }

    onMounted(async () => {
        await queryUtility();
    })
    watch(() => userInfo.dormitory, async () => {
        await queryUtility();
    })

    return { balance, isFetchingBalance }
}

export default useUtility;
