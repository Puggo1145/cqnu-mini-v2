"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (visualSignupInfo + linkOfficial + username + checkInfo + cusButton + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const cusButton = () => "../../../components/cus-button.js";
const username = () => "./_components/username.js";
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
        e: common_vendor.o(() => {
        }),
        f: common_vendor.o(prevPage),
        g: common_vendor.p({
          variant: "ghost"
        }),
        h: current.value,
        i: common_vendor.o(getCurrent),
        j: common_vendor.p({
          ["header-type"]: "nav"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/page.vue"]]);
wx.createPage(MiniProgramPage);
