import { ref, onMounted } from "vue";
// api
import { getSignInSessionAndAuthCode } from "@/utils/link-official";


export default function useFetchOfficialAuthCode() {
    const isFetching = ref(false);

    const captchaBase64 = ref<string>('');
    const authCode = ref<string>('');
    const dataObj = ref();

    async function refreshAuthCode() {
        isFetching.value = true;

        authCode.value = '';

        const data = await getSignInSessionAndAuthCode();
        if (data) {
            captchaBase64.value = "data:image/png;base64," + data.authCodeImg;
            dataObj.value = data.dataObj;
        }

        isFetching.value = false;
    }

    onMounted(async () => {
        // 清除教务系统 cookie 缓存
        await refreshAuthCode();
    })


    return {
        isFetching,
        captchaBase64,
        authCode,
        dataObj,
        refreshAuthCode
    }
}
