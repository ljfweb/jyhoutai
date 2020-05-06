//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 订单表的 骨架-规则  _id
const ordersSchem = db.Schema({
    //_id 订单编号
    userid: { type: db.Schema.Types.ObjectId }, //用户id
    username: { type: String }, //用户id
    address: { type: Object }, //收货信息
    sumprice: { type: Number }, //合计价格
    payprice: { type: Number }, //实付金额
    createtime: { type: Number }, //建立时间
    paytime: { type: Number }, //付款时间
    ddflag: { type: String }, //状态
    info: { type: Array }//订单详情
})
// 二、生成 模型
const ordersModel = db.model("orders", ordersSchem, "orders")

module.exports = ordersModel;