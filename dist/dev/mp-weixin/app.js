"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_statusBarHeight = require("./stores/statusBarHeight.js");
if (!Math) {
  "./pages/(Main)/today/page.js";
  "./pages/index/index.js";
  "./pages/(Main)/study/page.js";
  "./pages/(Main)/service/page.js";
  "./pages/(Main)/study/easy-note/page.js";
  "./pages/(Main)/study/easy-note/_components/create-easy-note.js";
  "./pages/(Main)/study/share-todo/page.js";
  "./pages/(Main)/study/share-todo/_components/create-share-todo.js";
  "./pages/(Main)/study/share-todo/_components/post-share-todo.js";
  "./pages/(Onboarding)/sign-up/page.js";
  "./pages/(Onboarding)/process-sign-up/page.js";
  "./pages/dev/page.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    const statusBarHeight = common_vendor.index.getMenuButtonBoundingClientRect().top;
    stores_statusBarHeight.useStatusBarHeight().set(statusBarHeight - 15);
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  app.use(common_vendor.uviewPlus);
  return {
    app,
    pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
