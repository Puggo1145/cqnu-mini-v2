import { validateTokenAndSyncUserInfo } from "@/api/user";


/**
 * @description 小程序初始化器
 */
class Initiator {
    // 检查 token 有效性
    async validateSignInStatus() {
        const token = uni.getStorageSync("token");
        // 检查 token 是否存在，不存在则跳转到首页登录
        if (!token) {
            uni.redirectTo({
                url: "/pages/index/index"
            });

            return;
        };

        // 有 token 检查 token 是否有效
        const isTokenValid = await validateTokenAndSyncUserInfo();
        if (!isTokenValid) {
            // token 无效，跳转到首页登录
            // 可以考虑直接调用 signin 来自动登录
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            if (currentPage.route !== "pages/index/index") {
                uni.redirectTo({
                    url: "/pages/index/index"
                });
            }
        } else {
            // token 有效，跳转到首页
            uni.switchTab({
                url: "/pages/(Main)/today/page"
            });
        }
    }

    // 验证 link Official cookie 有效性
    async validateLinkOfficialCookie() {
        // const cookie = uni.getStorageSync("Cookie");
        // if (!cookie) {
        //     uni.navigateTo({
        //         url: "/pages/index/index"
        //     });
        // }
    }

    // 添加页面拦截规则
    addInterceptPages(pagesOnIntercept: string[] = []) {
        // function isInterceptPage(page: string) {
        //     return pagesOnIntercept.includes(page);
        // }

        // uni.addInterceptor('navigateTo', {
        //     invoke(e) {
        //         if (isInterceptPage(e.url)) {
        //             uni.navigateTo({
        //                 url: "/pages/index/index"
        //             });
        //             return false;
        //         }
        //     }
        // })
    }
}

export default Initiator;