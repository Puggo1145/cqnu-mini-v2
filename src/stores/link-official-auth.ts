import { defineStore } from "pinia";

export interface LinkOfficialAuthState {
    mainCookie: string | null;
    jwxtCookie: string | null;
}

export const useLinkOfficialAuth = defineStore("useLinkOfficialAuth", {
    state: () => ({
        mainCookie: null,
        jwxtCookie: null
    }) as LinkOfficialAuthState,
    actions: {
        setMainCookie(mainCookie: string) {
            this.mainCookie = mainCookie;
        },
        setJwxtCookie(jwxtCookie: string) {
            this.jwxtCookie = jwxtCookie;
        }
    }
});