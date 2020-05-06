//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 管理员表的 骨架-规则 
const ceshisSchem = db.Schema({
    goodsname: { type: String },
    price: { type: String },

})
// 二、生成 模型
const ceshisModel = db.model("ceshis", ceshisSchem)

module.exports = ceshisModel;