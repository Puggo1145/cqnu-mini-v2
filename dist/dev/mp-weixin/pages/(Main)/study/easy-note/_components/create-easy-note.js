"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const utils_getDate = require("../../../../../utils/getDate.js");
const constants_icons = require("../../../../../constants/icons.js");
if (!Math) {
  (cusInput + cusSelect + cusButton + cusPage)();
}
const cusPage = () => "../../../../../components/cus-page.js";
const cusInput = () => "../../../../../components/cus-input.js";
const cusSelect = () => "../../../../../components/cus-select.js";
const cusButton = () => "../../../../../components/cus-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "create-easy-note",
  setup(__props) {
    const currentDate = common_vendor.ref(utils_getDate.getDate());
    const currentTime = common_vendor.ref("12:00");
    const tags = common_vendor.ref(["重要", "作业", "考试"]);
    function onDateChange(e) {
      currentDate.value = e.value;
    }
    function onTimeChange(e) {
      currentTime.value = e.value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["field-name"]: "标题"
        }),
        b: common_vendor.unref(constants_icons.icons).image,
        c: common_vendor.o(onDateChange),
        d: common_vendor.p({
          mode: "date",
          icon: common_vendor.unref(constants_icons.icons).calendar,
          value: currentDate.value
        }),
        e: common_vendor.o(onTimeChange),
        f: common_vendor.p({
          mode: "time",
          icon: common_vendor.unref(constants_icons.icons).clock,
          value: currentTime.value
        }),
        g: common_vendor.f(tags.value, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        h: common_vendor.p({
          ["header-type"]: "nav",
          ["padding-x"]: "16"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/create-easy-note.vue"]]);
wx.createPage(MiniProgramPage);
