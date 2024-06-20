"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (username + campusInfo + linkOfficial + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const username = () => "./_components/username.js";
const campusInfo = () => "./_components/campus-info.js";
const linkOfficial = () => "./_components/linkOfficial.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    const current = common_vendor.ref(0);
    const updateCurrent = (value) => current.value = value;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(updateCurrent),
        b: common_vendor.p({
          current: current.value
        }),
        c: common_vendor.o(updateCurrent),
        d: common_vendor.p({
          current: current.value
        }),
        e: current.value,
        f: common_vendor.o((e) => updateCurrent(e.detail.current)),
        g: common_vendor.p({
          ["header-type"]: "nav"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/sign-up/page.vue"]]);
wx.createPage(MiniProgramPage);
