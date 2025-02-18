import { validateTokenAndSyncUserInfo } from "@/api/user";
import { useLinkOfficialAuth } from "@/stores/link-official-auth";
// intercepted pages
import { pagesRequireLinkOfficial } from "@/constants/pagesOnIntercept";
// types
import type { Store } from "pinia";
import type { LinkOfficialAuthState } from "@/stores/link-official-auth";
import { STORAGE_KEYS } from "@/constants/storage-key";
/**
 * @description 小程序初始化器
 */
class Initiator {
    private linkOfficialAuth: Store<"useLinkOfficialAuth", LinkOfficialAuthState>;

    constructor() {
        this.linkOfficialAuth = useLinkOfficialAuth();
    }

    // 检查缓存是否存在官网账号，不存在则跳转到首页登录
    async validateSignInStatus() {
        const userInfo = uni.getStorageSync(STORAGE_KEYS.USER_INFO);
        if (!userInfo) {
            uni.redirectTo({
                url: "/pages/index/index"
            });

            return;
        };
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