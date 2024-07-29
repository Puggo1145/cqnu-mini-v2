import request from "@/utils/request";
import { acceptableErrorCode } from "@/constants/acceptableErrorCode";

interface SignInResponse {
    openid: string,
    token: string,
    toSignUp?: boolean
}

interface SignUpResponse {
    openid: string;
    token: string;
}

export const signin = async () => {
    try {
        const wxloginRes = await uni.login();

        const res = await request.POST<SignInResponse>({
            route: "auth/v1/wx/login",
        })
            .useParams({ code: wxloginRes.code })
            .send();

        // 登录成功，保存 token
        if (res.data.token && res.data.openid) {
            uni.setStorageSync("token", res.data.token);
            uni.setStorageSync("openid", res.data.openid);

            return { action: "signin" };
        }

        // 放行用户不存在 => 跳转注册
        if (res.code === acceptableErrorCode[0]) {
            return { action: "signup" };
        }
    } catch (err) {
        uni.showToast({
            title: "微信登录失败",
            icon: 'error'
        });
    }
}

interface SignUpData {
    username: string,
    studentId: string,
    identity: number,
    faculty: string,
    major: string,
    stuClass: string,
    password?: string // 校园官网密码
}
export const signup = async (signupData: SignUpData) => {
    try {
        const { code } = await uni.login();

        const res = await request.POST<SignUpResponse>({
            route: "auth/v1/wx/register",
            data: {
                code,
                ...signupData
            }
        })
            .send();

        // 注册成功，保存 token
        if (res.success) {
            uni.setStorageSync("token", res.data.token);
            
            return { success: res.success };
        }
    } catch (err) {
        uni.showToast({
            title: "注册失败",
            icon: 'error'
        });
    }
}