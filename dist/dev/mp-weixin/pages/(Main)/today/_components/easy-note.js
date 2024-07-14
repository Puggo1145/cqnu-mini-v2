"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
const api_easyNote = require("../../../../api/easy-note.js");
require("../../../../common/assets.js");
require("../../../../utils/request.js");
require("../../../../utils/requestManager.js");
require("../../../../constants/acceptableErrorCode.js");
if (!Math) {
  (cusButton + noNote + easyNoteCard)();
}
const cusButton = () => "../../../../components/cus-button.js";
const noNote = () => "./no-note.js";
const easyNoteCard = () => "../../study/easy-note/_components/easy-note-card.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note",
  setup(__props) {
    const notes = common_vendor.ref([]);
    const current = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    common_vendor.onMounted(async () => {
      const data = await api_easyNote.getNoteList(
        current.value,
        pageSize.value,
        "",
        ""
      );
      notes.value = data.records;
    });
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
            c: "5af6c310-2-" + i0,
            d: common_vendor.p({
              id: note.id,
              title: note.title,
              content: note.content,
              ["images-url"]: note.imagesUrl,
              deadline: note.deadline,
              ["course-name"]: note.courseName,
              tags: note.tags,
              openid: note.openid,
              username: note.username,
              seeNumber: note.seeNumber,
              supportNumber: note.supportNumber
            })
          };
        }),
        f: common_vendor.unref(constants_icons.icons).plus,
        g: common_vendor.o(goToCreateEasyNote)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/today/_components/easy-note.vue"]]);
wx.createComponent(Component);
