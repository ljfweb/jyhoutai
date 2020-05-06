
const express = require("express");
const app = express();
//跨域
const cors = require("cors");
app.use(cors());
//静态资源发布
app.use(express.static("public"))
// 载入 post 获取值的 模块
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//商品分类
const spflsModel = require("./model/spfls");
//商品 
const spsModel = require("./model/sps.js")
// 用户
const usersModel = require("./model/users.js")
// 收货地址
const addressModel = require("./model/address.js")
//订单
const ordersModel = require("./model/orders.js")
// 载入 jsonwebtoken
const jwt = require("jsonwebtoken")

// 1、首屏 分类 接口 --- 一级分类

app.get("/msiteclassify", (req, res) => {
    //查询数据库 --返回一级分类的数据 === （pid==0）
    spflsModel.find({ pid: "0" }, (err, data) => {
        if (err) {
            res.send({ "code": 400 })
        } else {
            res.send({ "code": 200, info: data })
        }
    })
})
{
    // 2、分类页面 接口-- - 一级和 二级分类
    // app.get("/classifyall", (req, res) => {
    //     // 查询一级，，，
    //     spflsModel.find({ pid: 0 }, (err, data) => {
    //         let arr = data;
    //         // data=== [{_id:xx,pid:0,title:手机},{_id:yy,pid:0},{_id:zz,pid:0}]
    //         let id = []
    //         if (data.length > 0) {
    //             for (let v of data) {
    //                 id.push(v._id)
    //             }
    //         }
    //         // $in  ：数组
    //         spflsModel.find({ pid: { $in: id } }, (err, data) => {
    //             arr = [...arr, ...data]
    //             res.send(arr)
    //         })

    //         // [{id:oooo,pid:xx，title：小米}]
    //     })
    // })

}

// 2、根据一级分类id 查询 二级分类信息
app.get("/classifytwo", (req, res) => {
    let id = req.query.id;
    spflsModel.find({ pid: id }, (err, data) => {
        if (err) {
            res.send({ "code": 400 })
        } else {
            res.send({ "code": 200, info: data })
        }
    })
})


// 3、根据分类id 查询商品
app.get("/classifyidgoods", (req, res) => {
    // 参数 分类id 
    let classifyid = req.query.classifyid;
    // 查询 所有的 分类
    spflsModel.find({}, (err, data) => {
        // 子分类 id 拼接成数组
        let arr = [];
        function getid(id) {
            for (let v of data) {
                if (v.pid == id) {
                    arr.push(v._id);
                    getid(v._id)// 递归调用
                }
            }
            return arr;
        }
        let x = getid(classifyid);
        x.push(classifyid)
        // 商品表中 根据分类id数组 查找商品
        spsModel.find({ flid: { $in: x }, showhide: true }, { "ggarr": 0, "fileList": 0, "goodsinfo": 0 },
            (err, data) => {
                res.send(data)
            })
    })


})


// 4、根据 商品名 模糊搜索 
app.get("/searchgoodsname", (req, res) => {
    let goodsname = req.query.goodsname;
    const reg = new RegExp(goodsname, 'i')

    spsModel.find({ "goodsname": { $regex: reg } }, { "ggarr": 0, "fileList": 0, "goodsinfo": 0 }, (err, data) => {
        if (err) {
            res.send({ "code": 400 })
        } else {
            res.send({ "code": 200, info: data })
        }
    })
})

//5、根据商品id 查询商品详情
app.get("/infobygoodsid", (req, res) => {
    let id = req.query.id;
    spsModel.findOne({ "_id": id }, (err, data) => {
        if (err) {
            res.send({ "code": 400 })
        } else {
            res.send({ "code": 200, info: data })
        }
    })
})

//6、注册接口
app.post("/register", (req, res) => {
    // 用户名,密码
    let { username, password } = req.body;
    //将 用户名,密码 插入数据库
    let obj = {
        "username": username,
        "password": password,
        "registerTime": new Date().getTime()
    }
    usersModel.findOne({ username: username }, (err, data) => {
        if (data) {
            res.send({ "code": 400 })
        } else {
            usersModel.create(obj, (err, data) => {
                if (err) {
                    res.send({ "code": 400 })
                } else {
                    res.send({ "code": 200 })
                }
            })
        }
    })

})

//7、判断账号是否存在
app.post("/checkuser", (req, res) => {
    // 用户名,密码
    let username = req.body.username;

    usersModel.findOne({ username: username }, (err, data) => {
        if (data) {
            res.send({ "code": 400 })
        } else {
            res.send({ "code": 200 })
        }
    })
})

//8、登录接口

app.post("/login", (req, res) => {
    let { username, password } = req.body;
    usersModel.findOne({ username: username, password: password }, (err, data) => {
        if (data) {
            // 如果登录成功 返回 token -- 60秒
            //生成token
            let content = { name: data._id }; // 要生成token的主题信息
            let secretOrPrivateKey = "gaogang" // 这是加密的key（密钥） 
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60  //60秒
            });
            res.send({ "code": 200, token: token, info: { _id: data._id, username: data.username } })
        } else {
            res.send({ "code": 400 })
        }
    })
})
//9、验证token 是否正确。。过期
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
//10、增加收货地址
app.post("/addaddress", (req, res) => {
    // 用户id ,收货人姓名，电话，地区，详细地址，邮政编码，是否默认地址
    // let {userid,name,tel,}=req.body;
    let userid = req.body.userid;
    let obj = {
        name: req.body.name,
        tel: req.body.tel,
        province: req.body.province,
        city: req.body.city,
        county: req.body.county,
        areaCode: req.body.areaCode,
        postalCode: req.body.postalCode,
        addressDetail: req.body.addressDetail
    }
    let isDefault = req.body.isDefault;

    addressModel.create({ userid: userid, address: JSON.stringify(obj), isDefault: isDefault }, (err, data) => {
        if (err) {
            // console.log(err)

            res.send({ 'code': 400 });

        } else if (isDefault == true) {

            addressModel.updateMany({ userid: userid, _id: { $ne: data._id } }, { isDefault: false }, (err) => {
                if (err) {
                    res.send({ 'code': 400 });
                } else {
                    res.send({ 'code': 200 });
                }
            })

        } else {
            res.send({ 'code': 200 });
        }
    })

})

// 11、查询收货地址
app.get("/alladdress", (req, res) => {
    let userid = req.query.userid;
    addressModel.find({ userid: userid }, (err, data) => {
        if (err) {
            res.send({ 'code': 400 });
        } else {
            res.send({ 'code': 200, info: data });
        }
    })
})
//12、根据id 查询 收货地址
app.get("/idofaddress", (req, res) => {
    let id = req.query.id;
    addressModel.findOne({ _id: id }, (err, data) => {
        if (err) {
            res.send({ 'code': 400 });
        } else {
            res.send({ 'code': 200, info: data });
        }
    })
})

//13、修改收货地址
app.post("/editaddress", (req, res) => {
    // 用户id ,收货人姓名，电话，地区，详细地址，邮政编码，是否默认地址
    // let {userid,name,tel,}=req.body;
    let userid = req.body.userid;
    let id = req.body.id;
    let obj = {
        name: req.body.name,
        tel: req.body.tel,
        province: req.body.province,
        city: req.body.city,
        county: req.body.county,
        areaCode: req.body.areaCode,
        postalCode: req.body.postalCode,
        addressDetail: req.body.addressDetail
    }
    let isDefault = req.body.isDefault;

    addressModel.updateOne({ _id: id }, { address: JSON.stringify(obj), isDefault: isDefault }, (err, data) => {
        if (err) {
            // console.log(err)

            res.send({ 'code': 400 });

        } else if (isDefault == true) {

            addressModel.updateMany({ userid: userid, _id: { $ne: id } }, { isDefault: false }, (err) => {
                if (err) {
                    res.send({ 'code': 400 });
                } else {
                    res.send({ 'code': 200 });
                }
            })

        } else {
            res.send({ 'code': 200 });
        }
    })

})

//14、修改默认地址
app.get("/editDefaultAddress", (req, res) => {
    // _id userid
    let { id, userid } = req.query;
    addressModel.updateMany({ userid: userid, _id: { $ne: id } }, { isDefault: false }, (err1) => {
        if (err1) {
            res.send({ 'code': 400 });
        } else {
            addressModel.updateOne({ userid: userid, _id: id }, { isDefault: true }, (err2) => {
                if (err2) {
                    res.send({ 'code': 400 });
                } else {
                    res.send({ 'code': 200 });
                }
            })
        }

    })
})
//15、根据id 删除 收货地址
app.get("/idDelAddress", (req, res) => {
    let id = req.query.id;
    addressModel.deleteOne({ "_id": id }, (err, data) => {
        if (err) {
            res.send({ 'code': 400 });
        } else {
            res.send({ 'code': 200 });
        }
    })
})
//16、获取默认收货地址
app.get("/defalutAddress", (req, res) => {
    // userid   
    let userid = req.query.userid;
    addressModel.findOne({ "userid": userid, "isDefault": true }, (err, data) => {
        if (err) {
            res.send({ 'code': 400 });
        } else {
            res.send({ 'code': 200, info: data });
        }
    })
})

//17、保存订单数据
app.post("/addorder", (req, res) => {
    // userid   
    let obj = req.body;
    // console.log(obj)
    ordersModel.create(obj, (err, data) => {
        if (err) {
            // console.log(err);
            res.send({ 'code': 400 });
        } else {
            res.send({ 'code': 200 });
        }
    })
})
app.listen(9527)



