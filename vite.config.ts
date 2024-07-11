import { defineConfig } from "vite";
import commonjs from 'vite-plugin-commonjs'
import uni from "@dcloudio/vite-plugin-uni";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';

export default defineConfig({
  // uni 是 uni-app 官方插件， uvtw 一定要放在 uni 后，对生成文件进行处理
  plugins: [
    uni(), 
    uvwt(), 
    commonjs()
  ],
  optimizeDeps: {
    include: [
      'cheerio',
      'parse5-htmlparser2-tree-adapter',
      'dom-serializer',
      'cheerio-select-tmp',
      'parse5',
      'domhandler',
      'htmlparser2'
    ]
  },
  resolve: {
    alias: {
      'parse5-htmlparser2-tree-adapter': 'parse5-htmlparser2-tree-adapter',
      'dom-serializer': 'dom-serializer',
      'cheerio-select-tmp': 'cheerio-select-tmp',
      'parse5': 'parse5',
      'domhandler': 'domhandler',
      'htmlparser2': 'htmlparser2'
    }
  },
  css: {
    postcss: {
      plugins: [
        // require('tailwindcss')() 和 require('tailwindcss') 等价的，表示什么参数都不传，如果你想传入参数
        // require('tailwindcss')({} <- 这个是postcss插件参数)
        require('tailwindcss'),
        require('autoprefixer')
      ],
    },
  },
  // build: {
  //   commonjsOptions: {
  //     include: ['node_modules']
  //   }
  // }
});