import RequestManager from "./requestManager";
import { acceptableErrorCode } from "@/constants/acceptableErrorCode";
// types
import type { MyResponse } from "@/types/response";
type ResponseError = { ok: false, message: string | undefined };
type ResponseSuccess<T> = { ok: true; data: MyResponse<T> };
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
): Promise<ResponseSuccess<T> | ResponseError> => {
    // 检查是否存在相同请求
    const existingRequest = requestManager.checkExistingRequest(method, route, data);
    if (existingRequest) {
        return existingRequest;
    }

    // 构造 headers
    const authorization = uni.getStorageSync('token') || '';
    const header = {
        "Authentication": authorization,
    }

    const requestPromise = new Promise<ResponseSuccess<T> | ResponseError>((resolve) => {
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
                    console.log(responseBody);

                    uni.showToast({
                        title: responseBody.message || '请求错误',
                        icon: 'error'
                    });

                    resolve({
                        ok: false,
                        message: responseBody.message
                    });
                }

                resolve({
                    ok: true,
                    data: responseBody
                });
            },
            fail: (res) => {
                uni.showToast({
                    title: "网络错误",
                    icon: "error"
                });

                resolve({ ok: false, message: res.errMsg });
            },
            complete: () => {
                showLoading && uni.hideLoading();
                requestManager.removeRequest(method, route, data);
            }
        })
    });

    // 将新请求添加到 requestManager
    requestManager.addRequest(method, route, data, requestPromise);

    return requestPromise;
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
    async send(): Promise<ResponseSuccess<T> | ResponseError> {
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