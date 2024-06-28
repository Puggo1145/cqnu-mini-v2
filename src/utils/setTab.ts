import { tabbarStyle } from "@/constants/tabbar-style"

export const setTabBackgroundColor = (
    backgroundStyle: "none" | "default" | "modern"
) => {
    uni.setTabBarStyle({
        backgroundColor: tabbarStyle[backgroundStyle],
    })
}