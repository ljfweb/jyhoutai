//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 商品分类表的 骨架-规则 
const spflsSchem = db.Schema({
    // _id // 商品分类ID
    title: { type: String }, // 商品分类名称
    imgurl: { type: String },//商品分类图标
    pid: { type: String }// 商品分类 父id 
})
// 二、生成 模型
const spflsModel = db.model("spfls", spflsSchem, "spfls")

module.exports = spflsModel;