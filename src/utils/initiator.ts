import { signin } from "@/api/auth";

class Initiator {
    // 检查 token 有效性
    static async validateToken() {
        const token = uni.getStorageSync("token");
        // 检查 token 是否存在，不存在则跳转到首页登录
        if (!token) {
            uni.navigateTo({
                url: "/pages/index/index"
            });
        };

        // 有 token 检查 token 是否有效
        
    }
}

export default Initiator;