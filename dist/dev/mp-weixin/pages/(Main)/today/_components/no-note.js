"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_images = require("../../../../constants/images.js");
require("../../../../common/assets.js");
if (!Math) {
  cusButton();
}
const cusButton = () => "../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "no-note",
  setup(__props) {
    function goToCreateEasyNote() {
      common_vendor.index.navigateTo({
        url: "/pages/(Main)/study/easy-note/_components/create-easy-note"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goToCreateEasyNote),
        b: common_vendor.p({
          variant: "secondary"
        }),
        c: common_vendor.unref(constants_images.images).NoEasyNote
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/today/_components/no-note.vue"]]);
wx.createComponent(Component);
