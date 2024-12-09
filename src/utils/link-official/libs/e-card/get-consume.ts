import urls from "../../constants/urls";
import { getECardToken } from "./signin-to-e-card";


export interface BalanceParams {
    timeFrom?: string;
    timeTo?: string;
}
type BalanceResponse = {
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
            duration: 1200
        });

        return false;
    }
}


export interface BillParams {
    timeFrom?: string;
    timeTo?: string;
    size: number;
    current: number;
}
export type BillRecord = {
    effectdateStr: string; // 交易时间字符串
    payIcon: 'weixin' | 'alipay'; // 交易方式
    resume: string; // 交易内容
    tranamt: number; // 交易金额
}
type BillResponse = {
    current: number;
    orders: unknown[];
    pages: number;
    records: BillRecord[];
    searchCount: boolean;
    size: number;
    total: number;
}
export const getBill = async (params: BillParams) => {
    try {
        const token = await getECardToken();

        const res = await uni.request({
            url: `${urls.bill}&size=${params.size}&current=${params.current}${params.timeFrom ? "&timeFrom=" + params.timeFrom : ''}${params.timeTo ? "&timeTo=" + params.timeTo : ''}`,
            method: 'GET',
            header: {
                "Synjones-Auth": `bearer ${token}`
            }
        });

        // @ts-expect-error 煞笔 uniapp 乱 jb 标类型
        return res.data.data as BillResponse;
    } catch (err) {
        uni.showToast({
            title: '获取账单失败',
            icon: 'error',
            duration: 1200
        });

        return false;
    }
}
