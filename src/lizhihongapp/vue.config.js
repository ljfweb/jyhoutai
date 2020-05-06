//可以解决项目配置问题，如端口号，服务器地址，关闭ESlint等
// console.log(process.env.NODE_ENV);
// const myport = process.env.NODE_ENV || 8090;
/*新建文件.env 里面配置-----{
  NODE_ENV = "development";
  BASE_URL = "/"
  VUE_APP_BASE_API = "/dev-api";
}*/
/*新建文件.env.development 里面配置-----{
  NODE_ENV = "development";
  BASE_URL = "/";
  VUE_APP_BASE_API = "/dev-api";
}*/
/*新建文件.env.production 里面配置-----{
  NODE_ENV = "production";
  BASE_URL = "/";
  VUE_APP_BASE_API = "/prod-api";
}*/
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  //如果不需要eslint把  lintOnSave  设为  false
  // lintOnSave: false,
  publicPath: "./",
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
      "/api": {
        target: "http://127.0.0.1:9527",
        changeOrigin: true,
        ws: true, // proxy websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  configureWebpack: {
    name: "jdshop-app",
    resolve: {
      alias: {
        "@": resolve("src"),
        views: resolve("src/views"),
        components: resolve("src/components"),
        utils: resolve("src/utils"),
        assets: resolve("src/assets")
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 37.5, // 换算的基数<------>//37.5----->375的设计图量多少写多少+++++-75----->750的设计稿
            selectorBlackList: ["weui", "mu"], // 忽略转换正则匹配项
            propList: ["*"]
          })
        ]
      }
    }
  }
};
