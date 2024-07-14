"use strict";
const common_vendor = require("../../../../common/vendor.js");
const constants_icons = require("../../../../constants/icons.js");
const stores_easyNote_classEasyNote = require("../../../../stores/easy-note/class-easy-note.js");
require("../../../../common/assets.js");
require("../../../../api/easy-note.js");
require("../../../../utils/request.js");
require("../../../../utils/requestManager.js");
require("../../../../constants/acceptableErrorCode.js");
if (!Math) {
  (cusButton + loading + noNote + easyNoteCard)();
}
const cusButton = () => "../../../../components/cus-button.js";
const noNote = () => "./no-note.js";
const easyNoteCard = () => "../../study/easy-note/_components/easy-note-card.js";
const loading = () => "../../../../components/loading.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "easy-note",
  setup(__props) {
    const store = stores_easyNote_classEasyNote.useClassEasyNoteStore();
    const current = common_vendor.ref(1);
    const pageSize = common_vendor.ref(5);
    common_vendor.onMounted(async () => {
      await store.fetchNotes({
        current: current.value,
        pageSize: pageSize.value,
        tagName: "",
        timespan: ""
      });
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
        d: common_vendor.unref(store).notes === void 0
      }, common_vendor.unref(store).notes === void 0 ? common_vendor.e({
        e: common_vendor.unref(store).notes === void 0
      }, common_vendor.unref(store).notes === void 0 ? {} : {}) : common_vendor.unref(store).notes && common_vendor.unref(store).notes.length === 0 ? {} : {
        g: common_vendor.f(common_vendor.unref(store).notes, (note, k0, i0) => {
          return {
            a: note.id,
            b: note.id,
            c: "5af6c310-3-" + i0,
            d: common_vendor.p({
              id: note.id,
              title: note.title,
              content: note.content,
              ["images-url"]: note.imagesUrl,
              deadline: note.deadline,
              ["course-name"]: note.courseName,
              ["tag-list"]: note.tagList,
              openid: note.openid,
              username: note.username,
              seeNumber: note.seeNumber,
              supportNumber: note.supportNumber
            })
          };
        }),
        h: common_vendor.unref(constants_icons.icons).plus,
        i: common_vendor.o(goToCreateEasyNote)
      }, {
        f: common_vendor.unref(store).notes && common_vendor.unref(store).notes.length === 0
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/puggo/Desktop/coding/cqnu-mini-vue/src/pages/(Main)/today/_components/easy-note.vue"]]);
wx.createComponent(Component);
