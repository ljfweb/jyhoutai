//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 用户收货地址表的 骨架-规则 
const addressSchem = db.Schema({
    userid: { type: db.Schema.Types.ObjectId },//用户id
    address: { type: String },//收货地址
    isDefault: { type: String }//是否为默认地址
})
// 二、生成 模型
const addressModel = db.model("address", addressSchem)

module.exports = addressModel;