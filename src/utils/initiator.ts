import { validateTokenAndSyncUserInfo } from "@/api/user";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";
// intercepted pages
import { pagesRequireLinkOfficial } from "@/constants/pagesOnIntercept";
// types
import type { Store } from "pinia";
import type { LinkOfficialAuthState } from "@/stores/link-official-auth";

/**
 * @description 小程序初始化器
 */
class Initiator {
    private linkOfficialAuth: Store<"useLinkOfficialAuth", LinkOfficialAuthState>;

    constructor() {
        this.linkOfficialAuth = useLinkOfficialAuth();
    }

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
            uni.showToast({
                title: "获取用户信息失败，请尝试重新登录",
                icon: 'none',
                duration: 1500
            })
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

    // 添加页面拦截规则
    addInterceptPages() {
        const isPageIntercepted = (page: string) => {
            return pagesRequireLinkOfficial.includes(page) && !this.linkOfficialAuth.mainCookie;
        }

        uni.addInterceptor('navigateTo', {
            invoke(e) {
                if (isPageIntercepted(e.url)) {
                    uni.navigateTo({
                        url: `/pages/(Main)/link-official/page?backPage=${e.url}`
                    });

                    return false;
                }
            }
        })
    }
}

export default Initiator;