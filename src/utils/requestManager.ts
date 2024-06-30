// 根据网络请求的方法，url 和 参数生成唯一 id，形成请求队列，防止还未完成的请求被重复发起
type Obj = Record<string, any>;
type Params = Record<string, Obj | any>;

class RequestManager {
    idMap: Map<string, string>;

    constructor() {
        this.idMap = new Map();
    }

    // 生成唯一 id 并将其存储到 map 中
    // id 存在，返回 false
    generateId(method: string, route: string, data: any = {}) {
        const id = this.generateUniqueId(method, route, data);

        if (this.idMap.has(id)) {
            return false;
        }

        this.idMap.set(id, id);
        return id;
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

    // 根据 id 删除 map 中的请求信息
    deleteById(id: string) {
        this.idMap.delete(id);
    }

    // 需要对 params 进行序列化，防止参数顺序不同导致的 id 不同
    serializeObject(obj: Params): string {
        // 取 key 进行排序
        const keys = Object.keys(obj).sort();
        const seriaizedObj: Record<string, string> = {};

        for (let key of keys) {
            const value = obj[key]

            if (value !== null && typeof value === 'object') {
                // 如果 value 是一个对象，递归展开
                seriaizedObj[key] = this.serializeObject(value);
            } else {
                seriaizedObj[key] = value;
            }
        }

        return JSON.stringify(seriaizedObj);
    }
}

export default RequestManager;