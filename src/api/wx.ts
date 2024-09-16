// 封装 uni.request 为 Promise
const requestPromise = (options: any) => {
    return new Promise((resolve, reject) => {
        uni.request({
            ...options,
            success: (res: any) => resolve(res),
            fail: (err: any) => reject(err)
        });
    });
};

export const getWeixinAccessToken = async () => {
    try {
        const response = await requestPromise({
            url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb6daf8568298c129&secret=17d8ebe6df34d443d493349c994cfa8a'
        });
        console.log(response);
        const { data } = response;
        uni.setStorageSync('access_token', data.access_token);
    } catch (error) {
        console.log(error);
    }
};

export const msgSecCheck = async (body: any) => {
    try {
        const accessToken = uni.getStorageSync('access_token');
        if (!accessToken) {
            throw new Error('Access token not found');
        }
        const response = await requestPromise({
            url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${accessToken}`,
            data: body,
            method: 'POST' // 确保请求方法正确
        });
        const { data: { result } } = response;
        if (result.suggest === 'pass') {
            return true;
        }else {
            return false;
        }
        
    } catch (error) {
        console.log(error);
    }
};