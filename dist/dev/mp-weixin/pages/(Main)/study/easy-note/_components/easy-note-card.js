"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const constants_easyNote_easyNoteCard = require("../../../../../constants/easy-note/easy-note-card.js");
const constants_icons = require("../../../../../constants/icons.js");
require("../../../../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note-card",
  props: {
    id: {},
    title: {},
    content: {},
    imagesUrl: {},
    deadline: {},
    courseName: {},
    tagList: {},
    openid: {},
    username: {},
    seeNumber: {},
    supportNumber: {}
  },
  setup(__props) {
    const easyNoteCardProps = __props;
    const isNoteImportant = common_vendor.computed(() => {
      if (easyNoteCardProps.tagList.length === 0) {
        return false;
      } else if (easyNoteCardProps.tagList.some((tag) => tag.tagName === "重要")) {
        return true;
      }
    });
    const noteColor = common_vendor.computed(() => {
      if (isNoteImportant.value) {
        return {
          bg: constants_easyNote_easyNoteCard.easyNoteColorMapper.important,
          tag: constants_easyNote_easyNoteCard.easyNoteTagColorMapper["重要"]
        };
      } else {
        return {
          bg: constants_easyNote_easyNoteCard.easyNoteColorMapper.normal,
          tag: easyNoteCardProps.tagList.length > 0 ? constants_easyNote_easyNoteCard.easyNoteTagColorMapper[easyNoteCardProps.tagList[0].tagName] : constants_easyNote_easyNoteCard.easyNoteTagColorMapper.default
        };
      }
    });
    const isCardOpen = common_vendor.ref(false);
    function onCardClick() {
      isCardOpen.value = !isCardOpen.value;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(easyNoteCardProps.title),
        b: common_vendor.t(easyNoteCardProps.deadline),
        c: common_vendor.t(easyNoteCardProps.courseName),
        d: common_vendor.t(easyNoteCardProps.username),
        e: common_vendor.t(easyNoteCardProps.seeNumber),
        f: easyNoteCardProps.tagList.length !== 0
      }, easyNoteCardProps.tagList.length !== 0 ? {
        g: common_vendor.t(isNoteImportant.value ? "重要" : _ctx.tagList[0].tagName),
        h: common_vendor.n(isCardOpen.value ? "scale-0" : "scale-100"),
        i: noteColor.value.tag
      } : {}, {
        j: common_vendor.n(isCardOpen.value ? "my-4 h-_1px_" : "my-0 h-0"),
        k: common_vendor.t(easyNoteCardProps.content),
        l: common_vendor.n(isCardOpen.value ? "h-_100px_" : "h-0"),
        m: isCardOpen.value
      }, isCardOpen.value ? {
        n: common_vendor.f(easyNoteCardProps.tagList, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag.tagName),
            b: tag.id,
            c: common_vendor.unref(constants_easyNote_easyNoteCard.easyNoteTagColorMapper)[tag.tagName]
          };
        }),
        o: common_vendor.t(easyNoteCardProps.supportNumber),
        p: common_vendor.unref(constants_icons.icons).easyNote.haveFive
      } : {}, {
        q: noteColor.value.bg,
        r: common_vendor.o(onCardClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/study/easy-note/_components/easy-note-card.vue"]]);
wx.createComponent(Component);
