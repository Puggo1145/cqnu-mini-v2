import request from "@/utils/request";

export const getUserInfo = async () => {
    const res = await request.GET({
        route: "user/v1/getUserInfo"
    })
        .send();

    return res;
}