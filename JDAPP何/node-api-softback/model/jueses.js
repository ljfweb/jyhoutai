//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 角色表的 骨架-规则  _id
const juesesSchem = db.Schema({
    title: { type: String },
    qxid: { type: Array }
})
// 二、生成 模型
const juesesModel = db.model("jueses", juesesSchem, "jueses")

module.exports = juesesModel;