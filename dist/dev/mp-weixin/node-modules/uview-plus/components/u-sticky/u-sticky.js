"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-sticky",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$1],
  data() {
    return {
      cssSticky: false,
      // 是否使用css的sticky实现
      stickyTop: 0,
      // 吸顶的top值，因为可能受自定义导航栏影响，最终的吸顶值非offsetTop值
      elId: common_vendor.guid(),
      left: 0,
      // js模式时，吸顶的内容因为处于postition: fixed模式，为了和原来保持一致的样式，需要记录并重新设置它的left，height，width属性
      width: "auto",
      height: "auto",
      fixed: false
      // js模式时，是否处于吸顶模式
    };
  },
  computed: {
    style() {
      const style = {};
      if (!this.disabled) {
        if (this.cssSticky) {
          style.position = "sticky";
          style.zIndex = this.uZindex;
          style.top = common_vendor.addUnit(this.stickyTop);
        } else {
          style.height = this.fixed ? this.height + "px" : "auto";
        }
      } else {
        style.position = "static";
      }
      style.backgroundColor = this.bgColor;
      return common_vendor.deepMerge(common_vendor.addStyle(this.customStyle), style);
    },
    // 吸顶内容的样式
    stickyContent() {
      const style = {};
      if (!this.cssSticky) {
        style.position = this.fixed ? "fixed" : "static";
        style.top = this.stickyTop + "px";
        style.left = this.left + "px";
        style.width = this.width == "auto" ? "auto" : this.width + "px";
        style.zIndex = this.uZindex;
      }
      return style;
    },
    uZindex() {
      return this.zIndex ? this.zIndex : common_vendor.zIndex.sticky;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getStickyTop();
      this.checkSupportCssSticky();
      if (!this.cssSticky) {
        !this.disabled && this.initObserveContent();
      }
    },
    initObserveContent() {
      this.$uGetRect("#" + this.elId).then((res) => {
        this.height = res.height;
        this.left = res.left;
        this.width = res.width;
        this.$nextTick(() => {
          this.observeContent();
        });
      });
    },
    observeContent() {
      this.disconnectObserver("contentObserver");
      const contentObserver = common_vendor.index.createIntersectionObserver({
        // 检测的区间范围
        thresholds: [0.95, 0.98, 1]
      });
      contentObserver.relativeToViewport({
        top: -this.stickyTop
      });
      contentObserver.observe(`#${this.elId}`, (res) => {
        this.setFixed(res.boundingClientRect.top);
      });
      this.contentObserver = contentObserver;
    },
    setFixed(top) {
      const fixed = top <= this.stickyTop;
      this.fixed = fixed;
    },
    disconnectObserver(observerName) {
      const observer = this[observerName];
      observer && observer.disconnect();
    },
    getStickyTop() {
      this.stickyTop = common_vendor.getPx(this.offsetTop) + common_vendor.getPx(this.customNavHeight);
    },
    async checkSupportCssSticky() {
      if (common_vendor.os() === "android" && Number(common_vendor.sys().system) > 8) {
        this.cssSticky = true;
      }
      this.cssSticky = await this.checkComputedStyle();
      if (common_vendor.os() === "ios") {
        this.cssSticky = true;
      }
    },
    // 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
    checkComputedStyle() {
      return new Promise((resolve) => {
        common_vendor.index.createSelectorQuery().in(this).select(".u-sticky").fields({
          computedStyle: ["position"]
        }).exec((e) => {
          resolve("sticky" === e[0].position);
        });
      });
    },
    // H5通过创建元素的形式嗅探是否支持css sticky
    // 判断浏览器是否支持sticky属性
    checkCssStickyForH5() {
    }
  },
  beforeUnmount() {
    this.disconnectObserver("contentObserver");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.stickyContent),
    b: $data.elId,
    c: common_vendor.s($options.style)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-84417a11"], ["__file", "/Users/erjietangfeiniao/Desktop/cqnu-mini-v2/node_modules/uview-plus/components/u-sticky/u-sticky.vue"]]);
wx.createComponent(Component);
