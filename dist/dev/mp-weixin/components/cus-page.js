"use strict";
const common_vendor = require("../common/vendor.js");
const stores_statusBarHeight = require("../stores/statusBarHeight.js");
const constants_icons = require("../constants/icons.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-page",
  props: {
    headerType: {},
    paddingX: {}
  },
  setup(__props) {
    const { statusBarheight } = stores_statusBarHeight.useStatusBarHeight();
    const {
      headerType,
      paddingX
    } = __props;
    const paddingTop = common_vendor.computed(() => {
      return headerType === "none" ? "0px" : statusBarheight.toString() + "px";
    });
    const goBack = () => common_vendor.index.navigateBack();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.headerType === "nav"
      }, _ctx.headerType === "nav" ? {
        b: common_vendor.unref(constants_icons.icons).back,
        c: common_vendor.o(goBack)
      } : {}, {
        d: (_ctx.paddingX || 0) + "px",
        e: (_ctx.paddingX || 0) + "px",
        f: paddingTop.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-page.vue"]]);
wx.createComponent(Component);
