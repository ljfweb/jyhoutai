//载入数据库链接模块
const db = require("../db.js");

// 一、 创建 商品表的 骨架-规则 
const spsSchem = db.Schema({
    goodsname: { type: String }, //商品名
    price: { type: String }, //价格
    goodsinfo: { type: String }, //详情
    showhide: { type: Boolean },//上架/下架
    ggarr: { type: Array },//规格
    imageUrl: { type: String },//商品缩略图
    fileList: { type: Array },//商品轮播图
    flid: { type: db.Schema.Types.ObjectId, ref: "spfls" } //商品分类id
})
// 二、生成 模型
const spsModel = db.model("sps", spsSchem)

module.exports = spsModel;
