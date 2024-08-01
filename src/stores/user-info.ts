import { defineStore } from "pinia";

interface UserInfo extends Record<string, any> {
    id: number | undefined;
    openid: string | undefined;
    studentId: string | undefined;
    linker: string | undefined; // 门户密码
    username: string | undefined;
    faculty: string | undefined;
    major: string | undefined;
    stuClass: string | undefined;
    grade: number | undefined;
    identity: number | undefined;
    showFlag: number | undefined;
}

const useUserInfo = defineStore("useUserInfo", {
    state: () => ({
        // id: undefined,
        // openid: undefined,
        // studentId: undefined,
        // linker: undefined,
        // username: undefined,
        // faculty: undefined,
        // major: undefined,
        // stuClass: undefined,
        // grade: undefined,
        // identity: undefined,
        // showFlag: undefined,
        id: 1,
        openid: "qw0d9ef8hufbh13q9efuwrv8hufgydbhsc",
        studentId: "2021050919079",
        linker: undefined,
        username: "puggo",
        faculty: "新闻与传媒学院",
        major: "网络与新媒体",
        stuClass: "网络与新媒体1班",
        grade: 2021,
        identity: 0,
        showFlag: 0,
    }) as UserInfo,
    actions: {
        setUserInfo(userInfo: UserInfo) {
            this.id = userInfo.id;
            this.openid = userInfo.openid;
            this.studentId = userInfo.studentId;
            this.linker = userInfo.linker;
            this.username = userInfo.username;
            this.faculty = userInfo.faculty;
            this.major = userInfo.major;
            this.stuClass = userInfo.stuClass;
            this.grade = userInfo.grade;
            this.identity = userInfo.identity;
            this.showFlag = userInfo.showFlag;
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