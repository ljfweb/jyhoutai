module.exports = {
  publicPath: "./", // 基本路径,打包时加上.

  css: {
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {
        //配置插件
        // 这里的选项会传递给 postcss-loader
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 37.5
          })
        ]
        // plugins: [
        //   require('autoprefixer')
        // ]
      } // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    // modules: false, // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },

  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: true, // 自动打开浏览器
    host: "0.0.0.0", // 允许外部ip访问
    port: 8080, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    // proxy: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9527",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/" //需要rewrite的,
        }
      }
    }
    // }
  },
  // 第三方插件配置
  pluginOptions: {}
};
