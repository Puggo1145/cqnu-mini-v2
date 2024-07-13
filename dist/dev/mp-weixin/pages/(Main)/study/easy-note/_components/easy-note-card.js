"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const constants_easyNote_easyNoteCard = require("../../../../../constants/easy-note/easy-note-card.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note-card",
  props: {
    id: {},
    title: {},
    content: {},
    imagesUrl: {},
    deadline: {},
    courseName: {},
    tags: {},
    openid: {},
    seeNumber: {},
    supportNumber: {}
  },
  setup(__props) {
    const easyNoteCardProps = __props;
    const isNoteImportant = common_vendor.computed(
      () => easyNoteCardProps.tags.some((tag) => tag.tagName === "重要")
    );
    const noteColor = common_vendor.computed(() => {
      if (isNoteImportant.value) {
        return constants_easyNote_easyNoteCard.easyNoteColorMapper.important;
      } else {
        return constants_easyNote_easyNoteCard.easyNoteColorMapper.normal;
      }
    });
    const isCardOpen = common_vendor.ref(false);
    function onCardClick() {
      isCardOpen.value = !isCardOpen.value;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(easyNoteCardProps.title),
        b: common_vendor.t(easyNoteCardProps.courseName),
        c: common_vendor.t(easyNoteCardProps.deadline),
        d: common_vendor.t(easyNoteCardProps.openid),
        e: common_vendor.t(easyNoteCardProps.seeNumber),
        f: common_vendor.t(_ctx.tags[0].tagName),
        g: common_vendor.unref(constants_easyNote_easyNoteCard.easyNoteTagColorMapper)[_ctx.tags[0].tagName],
        h: common_vendor.n(isCardOpen.value ? "my-4 h-_1px_" : "my-0 h-0"),
        i: common_vendor.t(easyNoteCardProps.content),
        j: common_vendor.n(isCardOpen.value ? "h-_100px_" : "h-0"),
        k: noteColor.value,
        l: common_vendor.o(onCardClick)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/easy-note-card.vue"]]);
wx.createComponent(Component);
