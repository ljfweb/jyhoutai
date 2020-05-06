//模拟 订单数据
const mnddsModel = require("./model/mndds.js");

// 生成随机数方法
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

//订单编号
let ddnummax = 10000000000000;
let ddnummin = 1;
//用户id userid

let useridmax = 10000000000000;
let useridmin = 1;
// 姓名

let firstname = ["张", "王", "李", "赵", "钱", "孙", "周"]
let lastname = ["一", "浩", "三", "刚", "文", "多", "大"]
// 合计价格
let sumpricemax = 10000;
let sumpricemin = 1;
// 实付价格
let paypricemax = 10000;
let paypricemin = 1;

// 当前时间
let nowdate = new Date().getTime();

//建立时间
let createtimemax = 1000 * 60 * 60 * 24 * 365;
let createtimemin = 0;

//付款时间
let paytimemax = 1000 * 60 * 60 * 24 * 365;
let paytimemin = 0;

//状态
let ddflagarr = ["已付款", "已完成", "已取消", "已发货", "已收货"]
// 随机数据 条数
let datanum = 10;
//随机数据
let data = []
for (let i = 0; i < datanum; i++) {
    data.push({
        ddnum: random(ddnummin, ddnummax),
        userid: random(useridmin, useridmax),
        name: firstname[random(0, firstname.length)] + lastname[random(0, lastname.length)],
        sumprice: random(sumpricemin, sumpricemax),
        payprice: random(paypricemin, paypricemax),
        createtime: nowdate - random(createtimemin, createtimemax),
        paytime: nowdate - random(paytimemin, paytimemax),
        ddflag: ddflagarr[random(0, ddflagarr.length)]
    })
}
// console.log(data);

mnddsModel.create(data, (err, data) => {
    console.log(err);
})