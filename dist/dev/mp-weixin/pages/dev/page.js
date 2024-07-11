"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (spinner + cusButton + cusInput + cusPage)();
}
const cusPage = () => "../../components/cus-page.js";
const spinner = () => "../../components/spinner.js";
const cusButton = () => "../../components/cus-button.js";
const cusInput = () => "../../components/cus-input.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    const captchaBase64 = common_vendor.ref("");
    const authCode = common_vendor.ref("");
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          size: "small",
          color: "white"
        }),
        b: common_vendor.p({
          ["class-name"]: "flex items-center gap-2"
        }),
        c: captchaBase64.value,
        d: common_vendor.o((event) => authCode.value = event.value),
        e: common_vendor.p({
          ["header-type"]: "nav",
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/dev/page.vue"]]);
wx.createPage(MiniProgramPage);
