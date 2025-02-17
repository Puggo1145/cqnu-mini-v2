import { STORAGE_KEYS } from "@/constants/storage-key";
import { defineStore } from "pinia";

const STORAGE_KEY = STORAGE_KEYS.USER_INFO;

export interface UserInfo extends Record<string, any> {
    id: number | undefined;
    openid: string | undefined;
    studentId: string | undefined;
    password: string | undefined; // 官网门户密码

    // faculty: string | undefined;
    // major: string | undefined;
    // stuClass: string | undefined;
    // grade: number | undefined;
    // identity: number | undefined;

    dormitory?: string;
    roomNumber?: string;
    ecardId?: string;
    cardPwd?: string;

    showFlag: number | undefined;
}

const useUserInfo = defineStore("useUserInfo", {
    state: () => {
        // 从本地存储加载初始状态
        const savedState = uni.getStorageSync(STORAGE_KEY) as UserInfo;
        return savedState || {
            id: undefined,
            openid: undefined,
            studentId: undefined,
            password: undefined,
            // grade: undefined,
            // faculty: undefined,
            // major: undefined,
            // stuClass: undefined,
            // identity: undefined,
            dormitory: undefined,
            roomNumber: undefined,
            ecardId: undefined,
            cardPwd: undefined,
            showFlag: undefined,
        } satisfies UserInfo;
    },
    actions: {
        setUserInfo(userInfo: Partial<UserInfo>) {
            // 更新状态
            Object.assign(this.$state, userInfo);
            // 保存到本地存储
            uni.setStorageSync(STORAGE_KEY, this.$state);
        },
        clearUserInfo() {
            Object.keys(this.$state).forEach((key) => {
                this.$state[key] = undefined;
            });
            // 清除本地存储
            uni.removeStorageSync(STORAGE_KEY);
        },
        getUserPublicInfo() {
            return {
                username: this.username,
                faculty: this.faculty,
                major: this.major,
                stuClass: this.stuClass,
                grade: this.grade,
                identity: this.identity,
                showFlag: this.showFlag,
            }
        },
        getModifiableInfo() {
            return {
                username: this.username,
                dormitory: this.dormitory,
                roomNumber: this.roomNumber,
            }
        },
        getUserPrivateInfo() {
            return this.$state;
        },
        // getDecryptedLinker() {
        //     if (this.linker) {
        //         return decryptPwd(this.linker);
        //     } else {
        //         return undefined;
        //     }
        // },
        // getDecryptedCardPwd() {
        //     if (this.cardPwd) {
        //         return decryptPwd(this.cardPwd);
        //     } else {
        //         return undefined;
        //     }
        // }
    }
})

export default useUserInfo;