"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  (spinner + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const spinner = () => "../../../components/spinner.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    common_vendor.onMounted(() => {
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/(Main)/today/page"
        });
      }, 2e3);
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Onboarding)/process-sign-up/page.vue"]]);
wx.createPage(MiniProgramPage);
