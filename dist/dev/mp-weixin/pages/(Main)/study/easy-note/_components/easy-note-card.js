"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const constants_easyNote_easyNoteCard = require("../../../../../constants/easy-note/easy-note-card.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note-card",
  props: {
    id: {},
    title: {},
    content: {},
    images: {},
    deadline: {},
    relatedCourse: {},
    tags: {},
    from: {},
    seenNumber: {},
    supportedNumber: {}
  },
  setup(__props) {
    const easyNoteCardProps = __props;
    const isNoteImportant = common_vendor.computed(() => easyNoteCardProps.tags.includes(0));
    const noteColor = common_vendor.computed(() => {
      if (isNoteImportant.value) {
        return constants_easyNote_easyNoteCard.easyNoteColorMapper.important;
      } else {
        return constants_easyNote_easyNoteCard.easyNoteColorMapper.normal;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(easyNoteCardProps.title),
        b: common_vendor.t(easyNoteCardProps.relatedCourse),
        c: common_vendor.t(easyNoteCardProps.deadline),
        d: common_vendor.t(easyNoteCardProps.from),
        e: common_vendor.t(easyNoteCardProps.seenNumber),
        f: common_vendor.t(common_vendor.unref(constants_easyNote_easyNoteCard.easyNoteTagMapper)[_ctx.tags[0]]),
        g: common_vendor.unref(constants_easyNote_easyNoteCard.easyNoteTagColorMapper)[_ctx.tags[0]],
        h: noteColor.value
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/easy-note-card.vue"]]);
wx.createComponent(Component);
