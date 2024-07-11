import * as cheerio from 'cheerio';
// constants
import headers from '../../constants/headers';
import urls from '../../constants/urls';

export interface DataObj {
    [key: string]: string
    lt: string
    execution: string
    _eventId: string
    isQrSubmit: string
    qrValue: string
    isMobileLogin: string
}

let dataObj: DataObj = {
    lt: '',
    execution: '',
    _eventId: '',
    isQrSubmit: '',
    qrValue: '',
    isMobileLogin: ''
};

export const getDynamicData = async () => {
    // 1. 请求登录页面
    const res = await uni.request({
        method: "GET",
        url: urls.signIn,
        header: headers.getSessionAndAuthCodeHeader,
        timeout: 8000
    })

    // 2. 解析 html
    const html = cheerio.load(res.data);

    // 3. 遍历 html ，获取表单字段
    html('input[type="hidden"]').each((_, element) => {
        const name = html(element).attr('name');
        const value = html(element).attr('value');

        if (name && value) {
            dataObj[name] = value;
        }
    });

    // 4. 保持 cookie
    uni.setStorageSync('Cookie', res.cookies[0]);

    return dataObj;
}