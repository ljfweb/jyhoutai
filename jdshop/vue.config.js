module.exports = {
  publicPath: "./", // 基本路径,打包时加上.
  // pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // 第三方插件配置
  // pluginOptions: {}
  css: {
    loaderOptions: {
      postcss: {
        // 这里的选项会传递给 postcss-loader
        plugins: [
          require("postcss-plugin-px2rem")({
            //配置项，详见官方文档
            rootValue: 37.5
          }) // 换算的基数
        ]
      }
    }
  },
  // webpack-dev-server 相关配置   代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9527",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
      // "/route": {
      //   target: "https://route.showapi.com/64-19",
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     "^/route": "/",
      //   },
      // },
    }
  }
};
