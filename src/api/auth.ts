import request from "@/utils/request";
import { acceptableErrorCode } from "@/constants/acceptableErrorCode";

interface SignInResponse {
    openid: string,
    token: string,
    toSignUp?: boolean
}

interface SignUpResponse {
    code: string,
    username: string,
    studentId: string,
    identity: 0 | 1,
    faculty: string,
    major: string,
    password?: string // 校园官网密码
}

export const signin = async () => {
    try {
        const wxloginRes = await uni.login();

        const res = await request.POST<SignInResponse>({
            route: "auth/v1/wx/login",
        })
            .useParams({ code: wxloginRes.code })
            .send();

        console.log(res);

        // 放行用户不存在 => 跳转注册
        if (res.code === acceptableErrorCode[0]) { 
            return { toSignUp: true };
        } else {
            return { toSignUp: false };
        }
    } catch (err) {
        uni.showToast({
            title: "微信登录失败",
            icon: 'error'
        });
    }
}

export const signup = async () => {
    try {
        const { code } = await uni.login();

        const res = await request.POST<SignUpResponse>({
            route: "auth/v1/wx/register",
            data: {
                code: code,
                username: "puggp",
                studentId: "2021050919079",
                identity: 0,
                faculty: "你说得对学院",
                major: "你说得对专业",
            }
        })
            .send();

        console.log(res);
    } catch (err) {
        uni.showToast({
            title: "注册失败",
            icon: 'error'
        });
    }
}