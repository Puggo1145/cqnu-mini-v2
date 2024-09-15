import { ref, onMounted } from "vue";
// api
import { getSignInSessionAndAuthCode } from "@/utils/link-official";


export default function useFetchOfficialAuthCode() {
    const captchaBase64 = ref<string>('');
    const authCode = ref<string>('');
    const dataObj = ref();

    async function refreshAuthCode() {
        authCode.value = '';

        const data = await getSignInSessionAndAuthCode();
        if (data) {
            captchaBase64.value = "data:image/png;base64," + data.authCodeImg;
            dataObj.value = data.dataObj;
        }
    }

    onMounted(async () => {
        // 清除教务系统 cookie 缓存
        await refreshAuthCode();
    })


    return {
        captchaBase64,
        authCode,
        dataObj,
        refreshAuthCode
    }
}
