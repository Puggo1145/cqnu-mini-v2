import urls from "../../constants/urls";
import { getECardToken } from "./signin-to-e-card";


interface BalanceParams {
    timeFrom?: string;
    timeTo?: string;
}
interface BalanceResponse {
    income: number;
    expenses: number;
}
export const getConsume = async (params: BalanceParams) => {
    try {
        const token = await getECardToken();

        const res = await uni.request({
            url: `${urls.consumeCount}&timeFrom=${params.timeFrom}&timeTo=${params.timeTo}`,
            method: 'GET',
            header: {
                "Synjones-Auth": `bearer ${token}`
            }
        });

        // @ts-expect-error 煞笔 uniapp 乱 jb 标类型
        return res.data.data as BalanceResponse;
    } catch {
        uni.showToast({
            title: '获取账单失败',
            icon: 'error',
        });

        return false;
    }
}
