module.exports = {
  // cssloader

  //代理
  devServer: {
    proxy: {
      "/VueHandler": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/VueHandler": "/VueHandler" //需要rewrite的,
        }
      }
    }
  }
};
