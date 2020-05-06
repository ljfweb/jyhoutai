module.exports = {
  // cssloader
  css: {
    loaderOptions: {
      postcss: {
        //配置插件
        // 这里的选项会传递给 postcss-loader
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 37.5
          })
        ]
      }
    }
  },

  //代理
  devServer: {
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
  }
};
