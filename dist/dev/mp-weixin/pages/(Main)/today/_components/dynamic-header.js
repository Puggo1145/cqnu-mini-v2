"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "dynamic-header",
  setup(__props) {
    const functionBtns = {
      notification: {
        icon: constants_icons.icons.notification,
        url: "/notification"
      },
      me: {
        icon: constants_icons.icons.me,
        url: "/me"
      }
    };
    const goto = (url) => common_vendor.index.navigateTo({ url });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(functionBtns, (btn, index, i0) => {
          return {
            a: btn.icon,
            b: index,
            c: common_vendor.o(($event) => goto(btn.url), index)
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/today/_components/dynamic-header.vue"]]);
wx.createComponent(Component);
