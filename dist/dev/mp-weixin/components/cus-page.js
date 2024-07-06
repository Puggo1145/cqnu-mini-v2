"use strict";
const common_vendor = require("../common/vendor.js");
const stores_statusBarHeight = require("../stores/statusBarHeight.js");
const constants_icons = require("../constants/icons.js");
require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cus-page",
  props: {
    headerType: { default: "default" },
    backgroundStyle: { default: "default" },
    paddingX: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const { statusBarheight } = stores_statusBarHeight.useStatusBarHeight();
    const paddingTop = common_vendor.computed(() => {
      return props.headerType === "none" ? "0px" : statusBarheight.toString() + "px";
    });
    const backgroundStyle = {
      none: "bg-transparent",
      default: "bg-background",
      modern: "bg-gradient-to-b from-_hE6EBF8_ to-_hF5F9FC_"
    };
    const goBack = () => common_vendor.index.navigateBack();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.headerType === "nav"
      }, props.headerType === "nav" ? {
        b: common_vendor.unref(constants_icons.icons).back,
        c: common_vendor.o(goBack)
      } : {}, {
        d: props.paddingX + "px",
        e: props.paddingX + "px",
        f: common_vendor.n(backgroundStyle[props.backgroundStyle]),
        g: paddingTop.value
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/components/cus-page.vue"]]);
wx.createComponent(Component);
