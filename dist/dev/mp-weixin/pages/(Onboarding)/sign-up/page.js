"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (visualSignupInfo + username + campusInfo + cusButton + linkOfficial + checkInfo + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const cusButton = () => "../../../components/cus-button.js";
const username = () => "./_components/username.js";
const campusInfo = () => "./_components/campus-info.js";
const linkOfficial = () => "./_components/linkOfficial.js";
const checkInfo = () => "./_components/check-info.js";
const visualSignupInfo = () => "./_components/visual-signup-info.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    const current = common_vendor.ref(0);
    const nextPage = () => current.value += 1;
    const prevPage = () => current.value -= 1;
    const getCurrent = (e) => current.value = e.detail.current;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          current: current.value
        }),
        b: common_vendor.o(nextPage),
        c: common_vendor.o(() => {
        }),
        d: common_vendor.o(nextPage),
        e: common_vendor.o(prevPage),
        f: common_vendor.p({
          ["class-name"]: "mt-6",
          variant: "ghost"
        }),
        g: common_vendor.o(() => {
        }),
        h: common_vendor.o(nextPage),
        i: common_vendor.o(prevPage),
        j: common_vendor.p({
          variant: "ghost"
        }),
        k: common_vendor.o(() => {
        }),
        l: common_vendor.o(prevPage),
        m: common_vendor.p({
          variant: "ghost"
        }),
        n: current.value,
        o: common_vendor.o(getCurrent),
        p: common_vendor.p({
          ["header-type"]: "nav"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/page.vue"]]);
wx.createPage(MiniProgramPage);
