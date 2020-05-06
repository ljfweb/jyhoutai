//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 权限表的 骨架-规则 
const quanxiansSchem = db.Schema({
    title: { type: String },
    name: { type: String },
    pid: { type: String }
})
// 二、生成 模型
const quanxiansModel = db.model("quanxians", quanxiansSchem)

module.exports = quanxiansModel;