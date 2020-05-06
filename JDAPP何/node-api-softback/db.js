const db = require("mongoose");
// 链接数据库
db.connect("mongodb://127.0.0.1:27017/jdshop", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("链接成功")
    }
});

module.exports = db;