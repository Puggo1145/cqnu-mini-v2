import RequestManager from "./requestManager";
import { acceptableErrorCode } from "@/constants/acceptableErrorCode";
// types
import type { MyResponse } from "@/types/response";
type ResponseError = {
    success: false;
    message: string;
};
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type Where = 'base' | 'linkOfficial';

// const baseURL = import.meta.env.VITE_BASE_URL;
const requestManager = Object.freeze(new RequestManager());


// 对 uniapp 请求对基本封装，返回一个 Promise
const Request = async <T>(
    targetURL: string,
    route: string,
    method: Methods,
    data: any,
    showLoading?: boolean // 该请求是否显示 loading
): Promise<MyResponse<T>> => {
    // 生成请求唯一 id，加入请求队列, 防止重复请求
    const requestId = requestManager.generateId(method, route, data);
    if (!requestId) {
        return Promise.reject('当前请求还未完成，请勿重复请求');
    }

    // 构造 headers
    const authorization = uni.getStorageSync('token') || '';
    const header = {
        "Authentication": authorization,
    }

    return new Promise((resolve, reject) => {
        showLoading && uni.showLoading({ title: '加载中' });

        uni.request({
            url: targetURL + route,
            method: method || 'GET',
            header: header,
            timeout: 8000,
            data: data,

            success: (res) => {
                const responseBody = res.data as MyResponse<T>;

                let isFetchSuccess = responseBody.code === '0' && responseBody.success;
                // 放行部分错误码
                if (acceptableErrorCode.includes(responseBody.code)) {
                    isFetchSuccess = true;
                }

                if (!isFetchSuccess) {
                    uni.showToast({
                        title: responseBody.message || '请求错误',
                        icon: 'error'
                    });
                    reject({
                        success: false,
                        message: responseBody.message || '请求错误'
                    });
                }

                resolve(responseBody);
            },
            fail: (res) => {
                uni.showToast({
                    title: res.errMsg || "网络错误",
                    icon: "error"
                });

                reject({ success: false });
            },
            complete: () => {
                showLoading && uni.hideLoading();
                requestManager.deleteById(requestId);
            }
        })
    })
}

// 实现 请求 + 分页 + 参数等功能的链式调用
export interface PageRequest {
    current: number;
    pageSize: number;
}
export interface SortRequest {
    field?: string;
    order: 'ascending' | 'descending';
    descStr?: string;
}
class RequestBuilder<T> {
    private where?: Where;
    private route: string;
    private method: Methods;
    private data: any;
    private showLoading: boolean
    private queryParams: Record<string, any>;

    constructor(
        where: Where,
        route: string,
        method: Methods,
        data: any,
        showLoading: boolean = false
    ) {
        this.where = where;
        this.method = method;
        this.route = route;
        this.data = data;
        this.showLoading = showLoading;
        this.queryParams = {};
    }

    // 请求参数
    useParams(params: Record<string, any>) {
        Object.assign(this.queryParams, params);  // 合并参数对象
        return this;
    }

    // 分页请求
    usePagination({ current, pageSize }: PageRequest) {
        Object.assign(this.queryParams, { current, pageSize });
        return this;
    }

    // // 排序
    // useSort({ field, order, descStr }: SortRequest) {
    //     Object.assign(this.queryParams, { field, order, descStr });
    //     return this;
    // }

    // 构建查询字符串
    private buildQueryString() {
        const params = Object.entries(this.queryParams).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
        return params.length > 0 ? `?${params}` : '';
    }

    // 发送请求
    async send(): Promise<MyResponse<T>> {
        // 构建最终的查询字符串
        const queryString = this.buildQueryString();

        // 选择请求地址
        const targetURL = this.where === 'base' ?
            import.meta.env.VITE_BASE_URL :
            import.meta.env.VITE_LINKOFFICIAL_URL

        return Request<T>(targetURL, this.route + queryString, this.method, this.data, this.showLoading);
    }
}


// 这么做是为了获得更好的全局类型提示，其次是为了处理不同请求方式在未来可能携带的不同参数
interface RequestOptions {
    where?: Where;
    route: string;
    showLoading?: boolean;
    data?: any;
}
const request:
    Record<Methods, <T>({ where, route, showLoading, data }: RequestOptions) => RequestBuilder<T>>
    = {
    GET: ({
        where = "base",
        route,
        showLoading
    }) => {
        return new RequestBuilder(where, route, 'GET', {}, showLoading)
    },
    POST: ({
        where = "base",
        route,
        data,
        showLoading
    }) => {
        return new RequestBuilder(where, route, 'POST', data, showLoading)
    },
    PUT: ({
        where = "base",
        route,
        data,
        showLoading
    }) => {
        return new RequestBuilder(where, route, 'PUT', data, showLoading)
    },
    DELETE: ({
        where = "base",
        route,
        data,
        showLoading
    }) => {
        return new RequestBuilder(where, route, 'DELETE', data, showLoading)
    },
};

export default request;