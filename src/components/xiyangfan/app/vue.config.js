module.exports = {
  publicPath: "./",

  css: {
    sourceMap: false,
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 37.5
          })
        ]
      }
    },
    requireModuleExtension: true
  },

  pwa: {},
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9527",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  pluginOptions: {}
};
