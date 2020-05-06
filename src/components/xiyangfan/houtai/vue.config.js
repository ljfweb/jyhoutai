module.exports = {
  devServer: {
    proxy: {
      "/VueHandler": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/VueHandler": "/VueHandler"
        }
      }
    }
  }
};
