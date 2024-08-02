// 根据网络请求的方法，url 和 参数生成唯一 id，形成请求队列，防止还未完成的请求被重复发起
type Obj = Record<string, any>;
type Params = Record<string, Obj | any>;

class RequestManager {
    idMap: Map<string, Promise<any>>;

    constructor() {
        this.idMap = new Map();
    }

    // 检查是否存在相同请求，如果存在则返回该请求的 Promise，否则返回 null
    checkExistingRequest(method: string, route: string, data: any = {}) {
        const id = this.generateUniqueId(method, route, data);
        return this.idMap.get(id) || null;
    }

    addRequest(method: string, route: string, data: any = {}, requestPromise: Promise<any>) {
        const id = this.generateUniqueId(method, route, data);
        this.idMap.set(id, requestPromise);
        return id;
    }

    removeRequest(method: string, route: string, data: any = {}) {
        const id = this.generateUniqueId(method, route, data);
        this.idMap.delete(id);
    }

    // 使用请求 method，url，params 生成唯一 id
    generateUniqueId(method: string, url: string, params: any) {
        const idString = `${method}-${url}-${this.serializeObject(params)}`;

        let id = 0;
        for (let i = 0; i < idString.length; i++) {
            id = ((id << 5) - id) + idString.charCodeAt(i);
        }

        return id.toString();
    }

    // 需要对 params 进行序列化，防止参数顺序不同导致的 id 不同
    serializeObject(obj: Params): string {
        // 取 key 进行排序
        const keys = Object.keys(obj).sort();
        const serializedObj: Record<string, string> = {};

        for (let key of keys) {
            const value = obj[key]

            if (value !== null && typeof value === 'object') {
                // 如果 value 是一个对象，递归展开
                serializedObj[key] = this.serializeObject(value);
            } else {
                serializedObj[key] = value;
            }
        }

        return JSON.stringify(serializedObj);
    }
}


export default RequestManager;