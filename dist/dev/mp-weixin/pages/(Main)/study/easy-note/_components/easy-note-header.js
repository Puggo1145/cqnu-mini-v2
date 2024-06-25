"use strict";
const common_vendor = require("../../../../../common/vendor.js");
if (!Math) {
  cusButton();
}
const cusButton = () => "../../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note-header",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          variant: "secondary",
          ["class-name"]: "w-_122px_ itext-primary"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/easy-note-header.vue"]]);
wx.createComponent(Component);
