import request from "@/utils/request";

interface CardInfoResponse {
    account: string
}
export const getCardInfo = async (studentId: string) => {
    return request.POST<CardInfoResponse[]>({
        where: "linkOfficial",
        route: "/getCardInfo",
        data: { studentId }
    })
        .send();
}

interface UtilityBalanceQueryData {
    eCardId: string;
    dormitoryName: string;
    roomNumber: string;
}
interface UtilityBalanceResponse {
    electricity: number;
    water: number | null;
}
export const getUtilityBalance = async (data: UtilityBalanceQueryData) => {
    return request.POST<UtilityBalanceResponse>({
        where: "linkOfficial",
        route: "/getUtilityBalance",
        data: {
            ...data,
            roomNumber: data.roomNumber.toString()
        }
    })
        .send();
}