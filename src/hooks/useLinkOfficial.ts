import { ref } from "vue";
// zod
import { z, ZodError } from "zod";
// api
import { signInToOfficial } from "@/utils/link-official";
import { signInToOfficialLocal } from "@/utils/link-official/libs/sign-in/signin-to-official";
// types
import type { DataObj } from "@/utils/link-official/libs/sign-in/getDynamicData";
import type { Ref } from "vue";


const linkOfficialSchema = z.object({
    studentId: z.string()
        .trim()
        .length(13, "请输入 13 位学号"),
    password: z.string()
        .trim()
        .min(1, "密码不能为空"),
    authCode: z.string()
        .trim()
        .min(1, "验证码不能为空"),
});


interface ILinkOfficial {
    dataObj: Ref<DataObj>,
    authCode: Ref<string>,
    studentId: Ref<string | undefined>,
    linker: Ref<string | undefined>,
    onSuccess: () => Promise<void> | void,
    onFail: () => Promise<void>,
}
export default function useLinkOfficial({
    dataObj,
    authCode,
    studentId,
    linker,
    onSuccess,
    onFail,

}: ILinkOfficial) {
    const studentIdInputRef = ref();
    const passwordInputRef = ref();
    const authCodeInputRef = ref();

    const isLinkingOfficial = ref(false);

    const submitLinkOfficialSignIn = async () => {
        isLinkingOfficial.value = true;

        try {
            // 1. 验证表单
            const form = linkOfficialSchema.parse({
                studentId: studentId?.value,
                password: linker?.value,
                authCode: authCode.value,
            });

            // 2. 登录官网 - Legacy
            // const signInRes = await signInToOfficial(
            //     form.studentId,
            //     form.password,
            //     form.authCode,
            //     dataObj.value,
            // )

            // if (!signInRes.ok) {
            //     await onFail();

            //     return;
            // }

            // await onSuccess();

            const signInSuccess = await signInToOfficialLocal(
                form.studentId,
                form.password,
                form.authCode,
                dataObj.value
            );

            if (signInSuccess) {
                await onSuccess();
            } else {
                await onFail();
            }
        } catch (err) {
            if (err instanceof ZodError) {
                // 显示错误消息
                err.errors.forEach((error) => {
                    if (error.path[0] === 'studentId') {
                        studentIdInputRef.value.showError(error.message);
                    } else if (error.path[0] === 'password') {
                        passwordInputRef.value.showError(error.message);
                    } else if (error.path[0] === 'authCode') {
                        authCodeInputRef.value.showError(error.message);
                    }
                });
            }
        } finally {
            isLinkingOfficial.value = false;
        }
    }

    return {
        isLinkingOfficial,
        submitLinkOfficialSignIn,
        studentIdInputRef,
        passwordInputRef,
        authCodeInputRef,
    }
}