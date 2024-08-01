import { defineStore } from "pinia";

export const useSignupInfo = defineStore('signupInfo', {
    state: () => ({
        username: '',
        studentId: '',
        linker: '',
        identity: null as number | null,
        faculty: null as string | null,
        major: null as string | null,
        stuClass: null as string | null,
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
        setLinker(newLinker: string) {
            this.linker = newLinker;
        },
        setStuClass(newStuClass: string) {
            this.stuClass = newStuClass;
        }
    }
})