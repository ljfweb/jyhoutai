//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 用户表的 骨架-规则 
const usersSchem = db.Schema({
    username: { type: String },
    password: { type: String },
    registerTime: { type: Number },
    loginTime: { type: Number },
    ddid: { type: db.Schema.Types.ObjectId },// 订单id
    addressid: { type: db.Schema.Types.ObjectId }//收货地址id

})
// 二、生成 模型
const usersModel = db.model("users", usersSchem)

module.exports = usersModel;