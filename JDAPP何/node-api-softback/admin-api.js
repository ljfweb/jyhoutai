const express = require("express");
const app = express();
// 解决跨域问题
const cors = require("cors");
app.use(cors())


// 载入 post 获取值的 模块
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 登录-- 验证用户名密码是否正确 --- 如果正确 返回 token，id

// 载入 jsonwebtoken
const jwt = require("jsonwebtoken")
// 载入 admins 表的 数据模型
const adminsModel = require("./model/admins.js")

app.post("/login", (req, res) => {
    // console.log("ss")
    // 接受 用户名 ，密码
    let { name, password } = req.body
    //链接数据库 -- 查找是否存在  name, password 的数据
    adminsModel.findOne({ "name": name, "password": password }, (err, data) => {
        if (data) {
            //生成token
            let content = { name: data._id }; // 要生成token的主题信息
            let secretOrPrivateKey = "gaogang" // 这是加密的key（密钥） 
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60  // 1小时过期
            });

            res.send({ "err_code": 200, "id": data._id, token: token })
        } else {
            res.send({ "err_code": 400 })
        }

    })
})


//检测token
//api.js
app.get('/checktoken', (req, res) => {

    let token = req.headers.token; // 从header中获取token
    let secretOrPrivateKey = "gaogang"; // 这是加密的key（密钥） 

    jwt.verify(token, secretOrPrivateKey, function (err) {
        if (err) {  //  时间失效的时候/ 伪造的token          
            res.send({ 'err_code': 400 });
        } else {
            res.send({ 'err_code': 200 });
        }
    })

})


// 添加权限 --post
const quanxiansModel = require("./model/quanxians.js")
app.post("/addquanxian", (req, res) => {
    //接受 post 传参数 ： title, name, pid 
    let { title, name, pid } = req.body;
    // 插入数据库
    let obj = { "name": name, "title": title, "pid": pid }
    //
    quanxiansModel.create(obj, (err, data) => {
        if (err) {
            res.send({ 'err_code': 400 })//错误--插入数据库失败
        } else {
            res.send({ 'err_code': 200 })//正确--插入数据库成功
        }
    })
})
//获取所有权限 -- GET
let mongoose = require('mongoose');
app.get("/listquanxian", (req, res) => {
    quanxiansModel.find({}, (err, data) => {
        // console.log(data)
        if (err) {
            res.send({ 'err_code': 400 })//错误--查询数据库失败
        } else {
            res.send({ 'err_code': 200, info: data })
        }
    })
})


// 根据 _id 删除权限 

app.get("/delquanxian", (req, res) => {
    // 获取 _id;
    let _id = req.query.id;
    //调用递归删除子权限
    treedel(_id)
    //删除自己
    quanxiansModel.deleteMany({ _id: _id }, (err, data) => {
        res.send({ err_code: 200 })
    })

})
// 递归删除 子权限
function treedel(id, res) {
    quanxiansModel.find({ "pid": id }, (err, data) => {
        if (data.length > 0) {
            for (let v of data) {
                // console.log(v.title)
                treedel(v._id)
                // console.log(v.title)
                quanxiansModel.deleteMany({ _id: v._id }, (err, data) => {
                    // console.log(data)
                })
            }
        }
    })
}
//角色
const juesesModel = require("./model/jueses.js")

// 添加角色 post -- 角色名称 权限数组
app.post("/jsadd", (req, res) => {
    let { title, qxid } = req.body;
    // 将 title,qxid 插入数据库
    juesesModel.create({ "title": title, "qxid": qxid }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200 }) //正确
        }
    })
})

// 获取所有角色 get 

app.get("/jslist", (req, res) => {
    juesesModel.find({}, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200, info: data }) //正确
        }
    })
})
// 删除角色  -- get -- id
app.get("/jsdel", (req, res) => {

    juesesModel.deleteOne({ _id: req.query.id }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200 }) //正确
        }
    })
})

// 修改-1、根据 角色 id  获取角色信息

app.get("/jsidinfo", (req, res) => {
    juesesModel.findOne({ _id: req.query.id }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200, info: data }) //正确
        }
    })
})

// 修改 -2 post --角色名称 权限数组 角色ID --根据 角色 id  修改 数据

app.post("/jsedit", (req, res) => {
    let { id, title, qxid } = req.body;
    juesesModel.updateOne({ _id: id }, { title: title, qxid: qxid }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200 }) //正确
        }
    })

})
// 后台管理员管理

// 添加后台管理员 -- post -- 管理员名 -- 角色id
app.post("/glyadd", (req, res) => {
    let { admin, password, jsid } = req.body;
    adminsModel.create({ name: admin, password: password, jsid: jsid }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200 }) //正确
        }
    })
})

// 获取所有管理员 --get


app.get("/glylist", (req, res) => {
    // adminsModel.find({}).populate("jsid").exec((err, data) => {
    //     // console.log(data)
    //     res.send({ info: data });
    // })

    adminsModel.find().populate("jsid").exec((err, data) => {
        // console.log(data)
        res.send({ "err_code": 200, info: data })
    })


})
// 删除 管理员 -- get -- id 
app.get("/glydel", (req, res) => {
    let id = req.query.id;
    adminsModel.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200 }) //正确
        }
    })
})
// id 查找 管理员 --get  --id

app.get("/glyidinfo", (req, res) => {
    let id = req.query.id;
    adminsModel.findOne({}, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200, info: data }) //正确
        }
    })
})

// 修改 -- post -- id ---  admin password jsid

app.post("/glyedit", (req, res) => {
    let { id, admin, password, jsid } = req.body;
    adminsModel.updateOne({ _id: id }, { "name": admin, "password": password, "jsid": jsid }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 }) //错误
        } else {
            res.send({ err_code: 200 }) //正确
        }
    })
})

// 根据 管理员id 获取 管理员 信息 以及 权限

app.get("/adminqx", (req, res) => {

    let id = req.query.id;
    // console.log(id)
    //(id--->查询 管理员表  -- -jsid >--- 角色 --qxid[[1,2],[2,4]] )联合查询   ---->权限表 ---[{},{},{}]
    adminsModel.findOne({ _id: id }).populate("jsid").exec((err, data) => {
        // res.send(data)
        let adminObj = { "_id": data._id, "name": data.name, "password": data.password }
        // 获取到 管理员对应的 角色 ，角色 对应的权限 。但是 权限 是一个二维数组 并有重复 
        let qxid = data.jsid.qxid;
        // 权限数组  降维 去重

        let qx = Array.from(new Set(qxid.flat(Infinity)));

        quanxiansModel.find({ _id: { $in: qx } }, (err, data) => {
            // res.send(data);
            adminObj.qxarr = data;
            res.send(adminObj);
        })

    })
})

// 判断 是否有权限 。。 -- get --  name （路由name === 权限表里的 name ）  id 当前管理员的id

app.get("/checkqx", (req, res) => {
    let name = req.query.name;
    let id = req.query.id;
    // 查找出 当前管理员 有哪些权限
    adminsModel.findOne({ _id: id }).populate("jsid").exec((err, data) => {
        //data ={_id,name,password,jsid:{ _id,qxid:[[],[]] } }
        let qx = Array.from(new Set(data.jsid.qxid.flat(Infinity)));
        quanxiansModel.find({ _id: { $in: qx } }, (err2, data2) => {
            //data2 [{_id,title,name:"qxlist",pid},{_id,name:"qxadd",pid,title}]
            // name == qxlist
            let f = data2.findIndex(val => val.name == name)
            if (f > -1) {
                res.send({ err_code: 200 })
            } else {
                res.send({ err_code: 400 })
            }
        })

    })
})




//单 文件上传
// 需要 multer
// 载入  multer 
let multer = require("multer");
let storage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, "./public/fl")
    },
    //文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let up = multer({ storage: storage });
app.use(express.static("public"))
app.post("/fileup", up.single("picture"), (req, res) => {
    // 接受文件。。
    // console.log(req.headers.host + "/fl/" + req.file.originalname)
    let imgurl = "/fl/" + req.file.originalname;
    res.send({ imgurl: imgurl })
})


// 商品分类 -- spfl 
const spflsModel = require("./model/spfls.js")
// 1、、 查找所有分类 ，返回 
app.get("/spflall", (req, res) => {
    // mongoose --- find
    spflsModel.find({}, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200, info: data })
        }
    })
})
// 2、添加分类

app.post("/spfladd", (req, res) => {
    let { title, imgurl, pid } = req.body;
    // console.log(pid)
    let obj = { "title": title, "imgurl": imgurl, "pid": pid };
    spflsModel.create(obj, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200 })
        }
    })
})

// 3、删除分类

// 4、根据 分类 id  查找 分类信息

//5、根据 分类 id  修改 


// 商品 - 缩略图 上传 sl 

let slstorage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, "./public/sl")
    },
    //文件名
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

let slup = multer({ storage: slstorage });

app.post("/slfileup", slup.single("sl"), (req, res) => {
    // 接受文件。。
    // console.log(req.headers.host + "/fl/" + req.file.originalname)
    let imgurl = "/sl/" + req.file.originalname;
    res.send({ imgurl: imgurl })
})


// 商品 - 轮播图 上传 sl 

let lbstorage = multer.diskStorage({
    // 文件存储路径
    destination: function (req, file, cb) {
        cb(null, "./public/lb")
    },
    //文件名
    filename: function (req, file, cb) {
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
    }
})

let lbup = multer({ storage: lbstorage });

app.post("/lbfileup", lbup.single("lb"), (req, res) => {
    // 接受文件。。
    // console.log(req.file)
    // console.log(req.headers.host + "/fl/" + req.file.originalname)
    let imgurl = "/lb/" + req.file.filename;
    res.send({ imgurl: imgurl })
})

// 添加商品 sp
const spsModel = require("./model/sps.js")
app.post("/addsp", (req, res) => {
    let { goodsname, price, goodsinfo, showhide, ggarr, imageUrl, fileList, flid } = req.body;
    // 将接受到的值 存入mongodb-- sps;
    let obj = { goodsname: goodsname, price: price, goodsinfo: goodsinfo, showhide: showhide, ggarr: ggarr, imageUrl: imageUrl, fileList: fileList, flid: flid }
    spsModel.create(obj, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200 })
        }
    })

})


// 商品展示 -- 分页 --接口 

app.get("/pagesp", (req, res) => {
    // page第几页 limit每页显示多少条数据
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let query = {};
    let flag = req.query.search;

    if (flag) {
        if (req.query.goodsname != "") {
            const reg = new RegExp(req.query.goodsname, 'i')
            query.goodsname = { $regex: reg }
        }
        if (req.query.price != "") {
            query.price = req.query.price
        }
    } else {
        query = {}
    }
    spsModel.find(query, { goodsname: 1, price: 1, imageUrl: 1, showhide: 1 }).skip((page - 1) * limit).limit(limit).sort({ "_id": -1 }).exec((err, data) => {
        res.send({ info: data })
    })
})

// 商品总条数--

app.get("/sumsp", (req, res) => {
    let query = {};
    let flag = req.query.search;

    if (flag) {
        // query = {
        //     goodsname: req.query.goodsname,
        //     price: req.query.price
        // }
        if (req.query.goodsname != "") {
            const reg = new RegExp(req.query.goodsname, 'i')
            query.goodsname = { $regex: reg }

        }
        if (req.query.price != "") {
            query.price = req.query.price
        }


    } else {
        query = {}
    }
    spsModel.count(query).exec((err, data) => {
        res.send({ sum: data })
    })
})
// 根据id 改变 上架/下架
app.get("/changeshowhide", (req, res) => {
    let { id, showhideval } = req.query;
    spsModel.updateOne({ "_id": id }, { "showhide": showhideval }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200 })
        }
    })
})

// 根据id 删除 数据

app.get("/delsp", (req, res) => {
    let id = req.query.id;
    spsModel.deleteOne({ "_id": id }, (err, data) => {
        if (err) {
            res.send({ err_code: 400 })
        } else {
            res.send({ err_code: 200 })
        }
    })
})


// 统计
// 商品分类统计 手机2 冰箱4

app.get("/fxgoods", (req, res) => {
    spsModel.aggregate([
        // 根据 flid 分组 求个数
        { $group: { _id: "$flid", count: { $sum: 1 } } },
        // 连表查询 --- 分类表 ---》 分类名称
        {
            $lookup: {
                from: "spfls",//需要连接的表名
                localField: "_id",//本表需要关联的字段
                foreignField: "_id",//被连接表需要关联的字段
                as: "fl"//查询出的结果集别名
            }

        },
    ]).exec((err, data) => {
        // res.send(data)
        let arr = [];
        for (let v of data) {
            arr.push({ title: v.fl[0].title, sum: v.count })
        }
        res.send(arr)
    })

})

// 模拟 统计
const fxgoodsModel = require("./model/fxgoods.js")
app.get("/mnfxgoods", (req, res) => {
    fxgoodsModel.find({}, { "_id": 0 }, (err, data) => {
        res.send(data)
    })
})


// 模拟 订单管理 
// 分页+条件 查询 
const mnddsModel = require("./model/mndds.js")
app.get("/mnddlist", (req, res) => {
    // 当前页数 page
    let page = Number(req.query.page)
    // 每页显示条数 limit
    let limit = Number(req.query.limit);
    // 查询条件 订单号ddnum ，日期(开始，结束) date
    let search = {};
    if ("ddnum" in req.query && req.query.ddnum != "") {
        search.ddnum = req.query.ddnum
    }
    if ("date" in req.query && req.query.date != "") {
        // console.log(req.query.date)
        // search.date = req.query.date
        search.paytime = { $gt: req.query.date[0], $lt: req.query.date[1] }

    }


    mnddsModel.find(search).skip((page - 1) * limit).limit(limit).sort({ "paytime": -1 }).exec((err, data) => {

        res.send({ info: data })
    })


})

// 查询 总条数

app.get("/mnddsum", (req, res) => {
    // 查询条件 订单号ddnum ，日期(开始，结束) date
    let search = {};
    if ("ddnum" in req.query && req.query.ddnum != "") {
        search.ddnum = req.query.ddnum
    }
    if ("date" in req.query && req.query.date != "") {
        // console.log(req.query.date)
        // search.date = req.query.date
        search.paytime = { $gt: req.query.date[0], $lt: req.query.date[1] }

    }
    mnddsModel.count(search).exec((err, data) => {
        res.send({ "sum": data })
    })

})




app.listen(3000)
