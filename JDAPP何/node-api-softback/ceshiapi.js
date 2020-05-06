// 生成 测试数据 ---30条

// let arr = [{ "goodsname": "aa", "price": "100" }, { "goodsname": "aa", "price": "100" }];
let arr = [];
for (let i = 1; i < 31; i++) {
    arr.push({ "goodsname": "苹果" + i, "price": 100 * i })
}


const ceshisModel = require("./model/ceshis");

ceshisModel.create(arr, (err, data) => {
    console.log(err);
})