//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 管理员表的 骨架-规则 
const fxgoodsSchem = db.Schema({
    title: { type: String },
    sum: { type: String },

})
// 二、生成 模型
const fxgoodsModel = db.model("fxgoods", fxgoodsSchem)

module.exports = fxgoodsModel;