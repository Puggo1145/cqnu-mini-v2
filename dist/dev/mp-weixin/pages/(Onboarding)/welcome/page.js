"use strict";
const common_vendor = require("../../../common/vendor.js");
const constants_images = require("../../../constants/images.js");
require("../../../common/assets.js");
if (!Math) {
  (flowTexts + cusButton + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const cusButton = () => "../../../components/cus-button.js";
const flowTexts = () => "./_components/flow-texts.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    const isSigningIn = common_vendor.ref(false);
    const handleSignIn = () => {
      isSigningIn.value = true;
      setTimeout(() => {
        isSigningIn.value = false;
        common_vendor.index.navigateTo({
          url: "/pages/(Onboarding)/sign-up/page"
        });
      }, 500);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(constants_images.images).landing,
        b: !isSigningIn.value
      }, !isSigningIn.value ? {} : {}, {
        c: common_vendor.t(isSigningIn.value ? "登录中" : "登录"),
        d: common_vendor.o(handleSignIn),
        e: common_vendor.p({
          variant: isSigningIn.value ? "muted" : "primary"
        }),
        f: common_vendor.p({
          ["header-type"]: "none"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/welcome/page.vue"]]);
wx.createPage(MiniProgramPage);
