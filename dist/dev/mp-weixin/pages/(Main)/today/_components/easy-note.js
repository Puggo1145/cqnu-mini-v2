"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
const mock_easyNote = require("../../../../mock/easy-note.js");
require("../../../../common/assets.js");
if (!Math) {
  (cusButton + noNote + easyNoteCard)();
}
const cusButton = () => "../../../../components/cus-button.js";
const noNote = () => "./no-note.js";
const easyNoteCard = () => "../../study/easy-note/_components/easy-note-card.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note",
  setup(__props) {
    const notes = common_vendor.ref(mock_easyNote.mockNotes);
    function goToEasyNote() {
      common_vendor.index.navigateTo({
        url: "/pages/(Main)/study/easy-note/page"
      });
    }
    function goToCreateEasyNote() {
      common_vendor.index.navigateTo({
        url: "/pages/(Main)/study/easy-note/_components/create-easy-note"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(constants_icons.icons).rightSecondary,
        b: common_vendor.o(goToEasyNote),
        c: common_vendor.p({
          variant: "ghost",
          ["class-name"]: "text-secondary-foreground font-normal"
        }),
        d: notes.value.length === 0
      }, notes.value.length === 0 ? {} : {
        e: common_vendor.f(notes.value, (note, k0, i0) => {
          return {
            a: note.id,
            b: note.id,
            c: "4ab621e3-2-" + i0,
            d: common_vendor.p({
              id: note.id,
              title: note.title,
              content: note.content,
              images: note.images,
              deadline: note.deadline,
              relatedCourse: note.relatedCourse,
              tags: note.tags,
              from: note.from,
              seenNumber: note.seenNumber,
              supportedNumber: note.supportedNumber
            })
          };
        }),
        f: common_vendor.unref(constants_icons.icons).plus,
        g: common_vendor.o(goToCreateEasyNote)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/pages/(Main)/today/_components/easy-note.vue"]]);
wx.createComponent(Component);
