// 如果没有 后台管理员 表 ，，创建默认账号密码。。。
// 载入 admins 表的 数据模型
const adminsModel = require("./model/admins.js")
// 三 、查找
adminsModel.find({}, (err, data) => {
    // 四、如果没有 创建
    if (data.length == 0) {
        adminsModel.create({ "name": "gao", "password": "123456", jsid: "" }, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log("管理员账号密码插入成功")
            }
        })

    }
})




