import { defineStore } from "pinia";

export const useStatusBarHeight = defineStore('statusBarHeight', {
    state: () => ({ statusBarheight: 0 }),
    actions: {
        set(newHeight: number) {
            this.statusBarheight = newHeight;
        }
    }
})