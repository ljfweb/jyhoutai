//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 管理员表的 骨架-规则 
const adminsSchem = db.Schema({
    name: { type: String },
    password: { type: String },
    jsid: { type: String, ref: "jueses" }
})
// 二、生成 模型
const adminsModel = db.model("admins", adminsSchem)

module.exports = adminsModel;