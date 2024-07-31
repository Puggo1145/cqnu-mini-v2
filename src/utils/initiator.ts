import { validateTokenAndSyncUserInfo } from "@/api/user";

class Initiator {
    // 检查 token 有效性
    async validateSignInStatus() {
        const token = uni.getStorageSync("token");
        // 检查 token 是否存在，不存在则跳转到首页登录
        if (!token) {
            uni.navigateTo({
                url: "/pages/index/index"
            });
        };

        // 有 token 检查 token 是否有效
        const isTokenValid = await validateTokenAndSyncUserInfo();
        if (!isTokenValid) {
            // token 无效，跳转到首页登录
            // 可以考虑直接调用 signin 来自动登录
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            if (currentPage.route !== "pages/index/index") {
                uni.navigateTo({
                    url: "/pages/index/index"
                });
            }           
        } else {
            // token 有效，跳转到首页
            uni.navigateTo({
                url: "/pages/(Main)/today/page"
            });
        }
    }
}

export default Initiator;