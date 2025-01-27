interface RequestOptions {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    header?: Record<string, string>;
    data?: any;
}

interface Response {
    statusCode: number;
    header: Record<string, string>;
    data: any;
    cookies?: Record<string, string>;
}

/**
 * 处理重定向请求的工具函数
 * @param options 请求配置
 * @param accumulatedCookies 累积的cookies (用于内部递归)
 * @returns Promise<Response>
 */
export const requestWithRedirect = async (
    options: RequestOptions,
    accumulatedCookies: string[] = []
): Promise<Response> => {
    // 合并已累积的 cookies 和当前请求的 cookies
    const cookieHeader = mergeCookies(
        accumulatedCookies,
        options.header?.['Cookie'] ? [options.header['Cookie']] : []
    );

    const requestOptions = {
        ...options,
        header: {
            ...options.header,
            Cookie: cookieHeader
        },
        redirect: "manual" as "manual",
    };

    return new Promise((resolve, reject) => {
        uni.request({
            ...requestOptions,
            complete: async (res: any) => {
                try {
                    // 获取新的 cookies
                    const newCookies = res.cookies || [];
                    console.log(requestOptions.url, res.header['Set-Cookie']);
                    
                    // 合并所有 cookies
                    const allCookies = [...accumulatedCookies, ...newCookies];

                    // 处理重定向
                    if (res.statusCode >= 300 && res.statusCode < 400) {
                        const location = res.header['Location'] || res.header['location'];
                        if (!location) {
                            throw new Error('Redirect location not found');
                        }

                        // 递归处理重定向
                        const redirectResponse = await requestWithRedirect(
                            {
                                ...options,
                                url: location,
                                method: 'GET', // 重定向总是 GET
                            },
                            allCookies
                        );
                        resolve(redirectResponse);
                    } else {
                        // 非重定向响应，返回最终结果
                        // 先将 cookies 转为 key-value 形式
                        const cookies = convertCookiesToKeyValues(allCookies);

                        resolve({
                            ...res,
                            cookies,
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            },
        });
    });
};

function convertCookiesToKeyValues(cookies: string[]): Record<string, string> {
    console.log(cookies);
    
    const cookieMap: Record<string, string> = {};
    cookies.forEach((cookieStr) => {
        const [cookiePair] = cookieStr.split(";");
        const [name, value] = cookiePair.split("=");
        if (name && value) {
            cookieMap[name.trim()] = value.trim();
        }
    });

    return cookieMap;
}

/**
 * 合并多个 cookie 字符串
 * @param cookieArrays cookie字符串数组的数组
 * @returns 合并后的cookie字符串
 */
function mergeCookies(...cookieArrays: string[][]): string {
    const cookieMap = new Map<string, string>();

    cookieArrays.flat().forEach(cookieStr => {
        if (!cookieStr) return;
        
        cookieStr.split(';').forEach(cookie => {
            const [key, ...value] = cookie.trim().split('=');
            if (key && value.length) {
                cookieMap.set(key.trim(), value.join('='));
            }
        });
    });

    return Array.from(cookieMap.entries())
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
} 