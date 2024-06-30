import RequestManager from "./requestManager";
import { acceptableErrorCode } from "@/constants/acceptableErrorCode";

// types
import type { MyResponse } from "@/types/response";
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseURL = import.meta.env.VITE_BASE_URL;
const requestManager = Object.freeze(new RequestManager());

// 对 uniapp 请求对基本封装，返回一个 Promise
const baseRequest = async <T>(
    route: string,
    method: Methods,
    data: any,
    showLoading?: boolean // 该请求是否显示 loading
): Promise<MyResponse<T>> => {
    try {
        // 生成请求唯一 id，加入请求队列, 防止重复请求
        const requestId = requestManager.generateId(method, route, data);
        if (!requestId) {
            return Promise.reject('当前请求还未完成，请勿重复请求');
        }

        return new Promise((resolve, reject) => {
            // 构造 headers
            const authorization = uni.getStorageSync('accessToken') || '';
            const header = {
                'Authorization': `Bearer ${authorization}`,
            }

            showLoading && uni.showLoading({ title: '加载中' });

            uni.request({
                url: baseURL + route,
                method: method || 'GET',
                header: header,
                timeout: 8000,
                data: data,

                success: (res) => {
                    const data = res.data as MyResponse<T>;

                    let isFetchSuccess = data.code === '0' && data.success;
                    // 放行部分错误码
                    if (acceptableErrorCode.includes(data.code)) {
                        isFetchSuccess = true;
                    }

                    if (!isFetchSuccess) {
                        uni.showToast({
                            title: data.message,
                            icon: "error"
                        });
                    }
                    
                    resolve(data);
                    
                    showLoading && uni.hideLoading();
                    requestManager.deleteById(requestId);
                },
                fail: (err) => {
                    uni.showToast({
                        title: "网络错误",
                        icon: "error"
                    });

                    reject(err.errMsg);

                    showLoading && uni.hideLoading();
                    requestManager.deleteById(requestId);
                }
            })
        })
    } catch (err) {
        uni.showToast({
            title: '应用出现错误',
            icon: 'error'
        });
        return Promise.reject(err);
    }
}

// 实现 请求 + 分页 + 参数等功能的链式调用
// export interface PageRequest {
//     page: number;
//     pageSize: number;
// }
// export interface SortRequest {
//     field?: string;
//     order: 'ascending' | 'descending';
//     descStr?: string;
// }
class RequestBuilder<T> {
    private route: string;
    private method: Methods;
    private data: any;
    private showLoading: boolean
    private queryParams: Record<string, any>;

    constructor(
        route: string,
        method: Methods,
        data: any,
        showLoading: boolean = false
    ) {
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

    // // 分页请求
    // usePagination({ page, pageSize }: PageRequest) {
    //     Object.assign(this.queryParams, { page, pageSize });
    //     return this;
    // }

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
        const queryString = this.buildQueryString();  // 构建最终的查询字符串
        return baseRequest<T>(this.route + queryString, this.method, this.data, this.showLoading);
    }
}


// 这么做是为了获得更好的全局类型提示，其次是为了处理不同请求方式在未来可能携带的不同参数
interface RequestOptions {
    route: string;
    showLoading?: boolean;
    data?: any;
}
const request:
    Record<Methods, <T>({ route, showLoading, data }: RequestOptions) => RequestBuilder<T>>
    = {
    GET: ({ route, showLoading }) => new RequestBuilder(route, 'GET', {}, showLoading),
    POST: ({ route, data, showLoading }) => new RequestBuilder(route, 'POST', data, showLoading),
    PUT: ({ route, data, showLoading }) => new RequestBuilder(route, 'PUT', data, showLoading),
    DELETE: ({ route, data, showLoading }) => new RequestBuilder(route, 'DELETE', data, showLoading),
};

export default request;