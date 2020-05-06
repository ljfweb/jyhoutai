const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  //如果不需要eslint把  lintOnSave  设为  false
  // lintOnSave: false,
  devServer: {
    //port:8090,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // mock数据
    // 接口代理
    proxy: {
      "/VueHandler": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true, // proxy websockets
        pathRewrite: {
          "^/VueHandler": "/VueHandler"
        }
      }
    }
  },
  configureWebpack: {
    name: "admin",
    resolve: {
      alias: {
        "@": resolve("src"),
        views: resolve("src/views"),
        components: resolve("src/components"),
        utils: resolve("src/utils"),
        assets: resolve("src/assets")
      }
    }
  }
};
