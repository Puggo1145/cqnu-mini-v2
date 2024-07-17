"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "smart-class",
  setup(__props) {
    const otherClasses = [
      {
        name: "计算机组成原理",
        time: "14 : 30"
      },
      {
        name: "web 开发实训",
        time: "16 : 30"
      },
      {
        name: "数据库原理",
        time: "19 : 30"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(otherClasses, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.time),
            c: item.name
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Main)/today/_components/smart-class.vue"]]);
wx.createComponent(Component);
