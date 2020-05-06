//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 订单表的 骨架-规则  _id
const mnddsSchem = db.Schema({
    ddnum: { type: String }, //订单编号
    userid: { type: String }, //用户id
    name: { type: String }, //收件人
    sumprice: { type: Number }, //合计价格
    payprice: { type: Number }, //实付金额
    createtime: { type: Number }, //建立时间
    paytime: { type: Number }, //付款时间
    ddflag: { type: String }, //状态
})
// 二、生成 模型
const mnddsModel = db.model("mndds", mnddsSchem, "mndds")

module.exports = mnddsModel;