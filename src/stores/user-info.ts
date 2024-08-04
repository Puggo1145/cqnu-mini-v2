import { defineStore } from "pinia";

export interface UserInfo extends Record<string, any> {
    id: number | undefined;
    openid: string | undefined;
    username: string | undefined;
    studentId: string | undefined;
    linker?: string; // 门户密码，预留字段

    faculty: string | undefined;
    major: string | undefined;
    stuClass: string | undefined;
    grade: number | undefined;
    identity: number | undefined;

    dormitory?: string;
    roomNumber?: string;
    eCardId?: string;

    showFlag: number | undefined;
}

const useUserInfo = defineStore("useUserInfo", {
    state: () => ({
        id: undefined,
        openid: undefined,

        username: undefined,
        studentId: undefined,
        linker: undefined,

        grade: undefined,
        faculty: undefined,
        major: undefined,
        stuClass: undefined,
        identity: undefined,

        dormitory: undefined,
        roomNumber: undefined,
        eCardId: "125630",

        showFlag: undefined,
        // id: 1,
        // openid: "qw0d9ef8hufbh13q9efuwrv8hufgydbhsc",

        // username: "puggo",
        // studentId: "2021050919079",
        // linker: undefined,

        // grade: 2021,
        // faculty: "新闻与传媒学院",
        // major: "网络与新媒体",
        // stuClass: "网络与新媒体1班",
        // identity: 0,

        // dormitory: undefined,
        // roomNumber: undefined,

        // showFlag: 0,
    }) as UserInfo,
    actions: {
        setUserInfo(userInfo: UserInfo) {
            this.$state = userInfo;
        },
        clearUserInfo() {
            Object.keys(this.$state).forEach((key) => {
                this.$state[key] = undefined;
            })
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
        getUserPrivateInfo() {
            return this.$state;
        }
    }
})

export default useUserInfo;