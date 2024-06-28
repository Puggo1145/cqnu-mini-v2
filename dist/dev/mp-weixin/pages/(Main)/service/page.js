"use strict";
const common_vendor = require("../../../common/vendor.js");
const constants_images = require("../../../constants/images.js");
require("../../../common/assets.js");
if (!Math) {
  (utilityConsumeCards + cusPage)();
}
const cusPage = () => "../../../components/cus-page.js";
const utilityConsumeCards = () => "./_components/utility-consume-cards.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "page",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(constants_images.images).serviceBg,
        b: common_vendor.p({
          ["background-style"]: "modern"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/service/page.vue"]]);
wx.createPage(MiniProgramPage);
