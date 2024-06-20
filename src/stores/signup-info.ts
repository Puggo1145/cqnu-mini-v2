import { defineStore } from "pinia";

export const useSignupInfo = defineStore('signupInfo', {
    state: () => ({
        username: null as string | null,
        studentId: null as string | null,
        identity: null as number | null,
        faculty: null as string | null,
        major: null as string | null,
        password: null as string | null,
    }),
    actions: {
        setUsername(newUsername: string) {
            this.username = newUsername;
        },
        setStudentId(newStudentId: string) {
            this.studentId = newStudentId;
        },
        setIdentity(newIdentity: number) {
            this.identity = newIdentity;
        },
        setFaculty(newFaculty: string) {
            this.faculty = newFaculty;
        },
        setMajor(newMajor: string) {
            this.major = newMajor;
        },
        setPassword(newPassword: string) {
            this.password = newPassword;
        }
    }
})