var express = require('express');
var router = express.Router();
var handler = require('./db.js');
var formidable = require('formidable');
var crypto = require('crypto');
var fs = require('fs');

var ObjectID = require('mongodb').ObjectID;

/*-----------------------------------------封装函数---------------------------------------------*/
function User(user) {
    this.id=user.id;
    this.name = user.name;
    this.password = user.password;
    this.veri = user.veri;
};
//迭代处理删除后的系统管理员各人员的tokenId
var recUpdate = function (req, res, collections, data) {
    if (data.length === 0) {
        res.send({"success": "删除成功"});
    } else {
        var selectors = [
            {"userName": data[0].userName},
            {
                $set: {
                    "tokenId": data[0].tokenId - 1
                }
            }
        ];
        handler("updates", collections, selectors, function (result) {
            if (result.result.n == 1) {
                data.shift();
                recUpdate(req, res, collections, data);
            } else {
                res.send({"success": "删除失败"});
            }
        });
    }
};
// 判断对象是否为空
var isNullObj = function (obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
};

var flagInt = 0;
//生成课程代码
var generateCode = function () {
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var str = "";
    for (var i = 0; i < 8; i++) {
        if (i < 4) {
            str += letters.splice(parseInt(Math.random() * (letters.length)), 1);
        } else {
            str += numbers.splice(parseInt(Math.random() * (numbers.length)), 1);
        }
    }
    return str;
}
//迭代处理课程列表删除后的ID
var recUpdateID = function (req, res, collections, data, fn) {
    if (data.length === 0) {
        res.end('{"success":"删除成功"}');
    } else {
        var selectors = [
            {"_id": data[0]._id},
            {
                $set: {
                    "ID": data[0].ID - 1
                }
            }
        ];
        handler("updates", collections, selectors, function (dat) {
            data.shift();
            // 判断删除是否失败
            if (dat.result.n == 0) {
                res.end('{"err":"抱歉，删除失败"}');
                // 判断是否还有要处理的数据
            } else if (data.length != 0) {
                recUpdateID(req, res, collections, data, fn);
            } else {
                //判断是否要执行 fn 回调函数
                if (fn) {
                    fn();
                } else {
                    res.end('{"success":"删除成功"}');
                }
            }
        });
    }
};
//迭代删除目录绑定的视频
/*
 *  dirID:目录_id
 *  proID:课程_id
 *  VstateName:课程名称
 *  data  需要处理的视频数据集
 * */
var delDirVideo = function (req, res, dirID, proID, VstateName, data, fn) {
    var dirIDProName = dirID + proID;
    if (data.length === 0) {
        fn();
    } else {
        //查询与课程ID对应的目录条数看与该课程绑定的目录是否只剩一条否则不改变videoList的Vstate字段
        handler("find", "directoryList", {"CDid": proID}, function (set) {
            //console.log(set);
            //拆分Vstate去除其中的已删除课程名
            var targetArrVstate = data[0].Vstate.split(",");
            if (set.length === 1) {
                var indexNumberVstate = (function (arr, val) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == val) return i;
                    }
                    return -1;
                })(targetArrVstate, VstateName);
                targetArrVstate.splice(indexNumberVstate, 1);
            }
            //拆分Vmosaic去除其中的dirIDProName
            var targetArrVmosaic = data[0].Vmosaic.split(",");
            var indexNumberVmosaic = (function (arr, val) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) return i;
                }
                return -1;
            })(targetArrVmosaic, dirIDProName);
            targetArrVmosaic.splice(indexNumberVmosaic, 1);

            var selectors = [
                {"_id": data[0]._id},
                {
                    $set: {
                        "Vstate": targetArrVstate.join(","),
                        "Vmosaic": targetArrVmosaic.join(",")
                    }
                }

            ];
            //console.log(selectors);
            //更新视频列表对应数据的Vstate与Vmosaic字段
            handler("updates", "videoList", selectors, function (da) {
                data.shift();
                if (data.length == 0) {
                    fn();
                } else if (data.length != 0) {
                    delDirVideo(req, res, dirID, proID, data, fn);

                }
            });
        });

    }
}
//迭代删除课程绑定的目录
/*
 proID 课程的_id
 * */
var delProDir = function (req, res, proID, fn) {
    //查询productList，获取对应ID的课程信息的_id和课程名
    handler("find", "productList", {_id: proID}, function (das) {
        //获取对应课程_id的目录集directoryList
        handler("find", "directoryList", {CDid: proID}, function (da) {
            if (da.length !== 0) {
                /*
                 * /*
                 *  dirID:目录_id
                 *  proID:课程_id的拼合串
                 *  VstateName:课程名称
                 *  data  需要处理的视频数据集
                 *
                 var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
                 * */
                //获取第一个目录相关的视频集
                handler("find", "videoList", {Vmosaic: {$regex: '.*' + da[0]._id + das[0]._id + '.*'}}, function (daa) {
                    delDirVideo(req, res, da[0]._id, das[0]._id, das[0].Cname, daa, function () {
                        //删除该目录
                        handler("deletes", "directoryList", {_id: da[0]._id}, function (dat) {
                            //再次验证看该课程下是否还有目录，如果有就迭代处理
                            handler("find", "directoryList", {CDid: proID}, function (data) {
                                if (data.length === 0) {
                                    fn();
                                } else {
                                    delProDir(req, res, proID, fn);
                                }
                            });
                        });
                    });

                });

            } else {
                fn();
            }
        });

    });


};


//客户端获取验证
/*-----------------------------------------具体接口-----------------------------------------------*/
// 验证码接口
//客户端获取验证码字符及校验验证码接口
router.get('/AdminLoginAndRegHandler', function (req, res) {
    var action = req.query.action;
    switch (action) {
        case "verification": // 生成验证码
            var randomNum = function (min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            };
            var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
            var returnStr = "";
            for (var i = 0; i < 4; i++) {
                var txt = str[randomNum(0, str.length)];
                returnStr += txt;
            }
            var newUser = new User({
                name: "",
                password:"",
                id:"",
                veri:returnStr
            });
            req.session.user = newUser;
            console.log(newUser)
            var sss={"success":"成功","data":returnStr}
            var kk = JSON.stringify(sss);
            res.send(kk);
            break;
        case "checkVerification" :// 校验验证码
            if (req.session.user && req.query.veri == req.session.user.veri) {
                res.send({"success": "验证码正确"});
            } else {
                res.send({"err": "验证码错误"});
            }
            break;
        default:
            res.send({"err": '请求路径错误'});
    }
});
// 管理员接口
router.post('/AdminLoginAndRegHandler', function (req, res) {
    var action = req.query.action;
    switch (action) {
        case "login": // 登录
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('base64');

            handler("find", "Administor", {userName: req.body.userName, password: password}, function (data) {
                if (data.length === 0) {
                    res.send({"err": "抱歉，系统中并无该用户，如有需要，请向管理员申请"});
                } else if (data.length !== 0 && data[0].password === password) {
                    req.session.user.name = req.body.userName;
                    req.session.user.password = password;
                    req.session.user.id = data[0]._id;
                    res.send({"success": "登录成功"});
                }

            });
            break;

        case "returnuserinfo": // 返回登录管理员信息
            req.query.action = 'find';
            //从session中拿去当前用户的用户名和密码
            // var sessionUserName = req.session.user.name;
            // var sessionPassword = req.session.user.password;
            var sessionId = new ObjectID(req.session.user.id);
            handler("find", "Administor", {"_id": sessionId}, function (data) {
                if (data.length == 0 || data.length > 1) {
                    res.send({"err": "抱歉，系统故障"});
                } else {
                    res.send({success: "成功", data: data[0]});
                }

            });
            break;

        case "add": // 添加管理员
            handler("find", "Administor", {userName: req.body.userName}, function (docs) {
                if (docs.length != 0) {
                    res.send({err: "用户名已存在，请从新输入"});
                } else {
                    handler("find", "Administor", null, function (arr) {
                        var md5 = crypto.createHash('md5');
                        //组织用户信息并作一些校验
                        var userInfos = {};
                        userInfos.createAt = new Date();
                        userInfos.isdelete = /^fcgl/.test(req.body.turename) ? false : true;
                        userInfos.password = md5.update(req.body.password).digest('base64');
                        userInfos.phone = /^1\d{10}$/.test(parseInt(req.body.phone)) ? req.body.phone : false;
                        userInfos.power = req.body.powerCode == "1" ? "系统管理员" : "课程管理员";
                        userInfos.powerCode = req.body.powerCode;
                        userInfos.success = "成功";
                        userInfos.tokenId = arr.length + 1;
                        userInfos.upDateAt = new Date();
                        userInfos.userName = req.body.userName == "" ? false : req.body.userName;
                        userInfos.turename = req.body.turename == "" ? false : req.body.turename;
                        if (userInfos.phone != false && userInfos.userName != false && userInfos.turename != false) {
                            handler("add", "Administor", userInfos, function (data) {
                                if (data.result.n != 1) {
                                    res.send({"err": "抱歉，添加失败"});
                                } else {
                                    res.send({"success": "注册成功"});
                                }
                            });
                        } else {
                            res.send({"err": "抱歉，添加失败。参数格式"});
                        }
                    });
                }
            });
            break;
        default:
            res.send({"err": '请求路径错误'});
    }
});
//管理员列表(show,delete，quit)
router.get('/AdminHandler', function (req, res) {
    var action = req.query.action;
    switch (action) {
        case "lockuser": // 学员的冻结
            //获取与tokenId对应的该条数据
            handler("find", "studentList", {tokenId: parseInt(req.query.tokenId)}, function (da) {
                if (da.length == 0) {
                    res.send({"err": "冻结失败"})
                } else {
                    var selectors = [
                        {tokenId: parseInt(req.query.tokenId)},
                        {
                            $set: {
                                isstate: da[0].isstate ? false : true
                            }
                        }

                    ];
                    //切换当前字段isstate的状态
                    handler("updates", "studentList", selectors, function (result) {
                        if (result.result.n == 1) {
                            res.send({"success": "操作成功"});
                        } else {
                            res.send({"err": "抱歉，冻结失败"});
                        }
                    });
                }
            });
            break;
        case "quit": //管理员退出
            if (req.session.user) {
                req.session.user = {};
            }
            res.send({"success": "退出成功"});
            break;
        case "show": // 管理员显示
            handler("find", "Administor", null, function (arr) {
                console.log(req.query.searchText);
                var selector = !req.query.searchText ? {
                    tokenId: {
                        $gt: arr.length - (parseInt(req.query.pageStart) * 3 - 3) - 3,
                        $lte: arr.length - (parseInt(req.query.pageStart) * 3 - 3)
                    }
                } : {turename: {$regex: '.*' + req.query.searchText + '.*', $options: 'i'}};
                handler("find", "Administor", selector, function (data) {
                    if (data.length == 0) {
                        res.send({"err": "抱歉，系统中查不到人员"});
                    } else {
                        var result = {
                            success: "成功",
                            data: {
                                pageSize: 3,
                                count: arr.length,
                                list: data
                            }
                        };
                        res.send(result);
                    }
                });
            });
            break;
        case "delete": // 管理员删除
            //删除操作
            handler("deletes", "Administor", {tokenId: parseInt(req.query.tokenId), isdelete: true}, function (data) {
                if (data.result.n == 0) {
                    res.send({"err": "删除失败"});
                } else {
                    //获取tokenId大于当前tokenId的数据集，并迭代处理管理员列表的tokenId
                    handler("find", "Administor", {tokenId: {$gt: parseInt(req.query.tokenId)}}, function (da) {
                        recUpdate(req, res, "Administor", da);
                    });
                }
            });
            break;

        default:
            res.send({"err": '请求路径错误'});
    }

});
//管理员列表update returnuserinfo  updatepass update
router.post('/AdminHandler', function (req, res) {
    var action = req.query.action;
    switch (action) {
        case "update": //修改管理员信息
            var selectors = [
                    {"tokenId": parseInt(req.body.tokenId)},
                    {
                        $set: {
                            "turename": req.body.turename,
                            "phone": req.body.phone,
//                          "powerCode": req.body.powerCode,
                            "power": req.body.power,
                            "upDateAt": new Date()
                        }
                    }

                ]
            ;
            console.log(selectors)
            handler("updates", "Administor", selectors, function (data) {
                if (data.result.n == 0) {
                    res.send({"err": "抱歉，更新失败"});
                } else {
                    res.send({"success": "更新成功1"});
                }
            });
            break;
        case
        "updatepass": // 修改密码
            var md5 = crypto.createHash('md5');
            var passwordMd5 = md5.update(req.body.userPwd).digest('base64');
            //判断原密码是否正确
            if (req.session.user.password != passwordMd5) {
                res.send({"err": "密码错误"});
            } else {
                var md56 = crypto.createHash('md5');
                var newPwd = req.session.user.password = md56.update(req.body.newPwd).digest('base64');
                var selectors = [
                    {"userName": req.session.user.name},
                    {
                        $set: {
                            "password": newPwd,
                            "upDateAt": new Date()
                        }
                    }

                ];
                //将同样加密过的新密码更新到数据库
                handler("updates", "Administor", selectors, function (data) {
                    if (data.result.n == 0) {
                        res.send({"err": "密码更新失败"});
                    } else {
                        res.send({"success": "更新成功"});
                    }
                });
            }
            break;

        /*--------------学员列表 添加  查询----------*/
        case "adduser": // 添加学员
            //获取学员列表的数据总数
            handler("find", "studentList", null, function (arr) {
                //组织学员信息并作一些校验
                var userInfos = {};
                userInfos.createAt = new Date();
                userInfos.email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(req.body.addemail) ? req.body.addemail : "数据格式不对";
                userInfos.isstate = false;
                userInfos.phone = /^1\d{10}$/.test(parseInt(req.body.addphone)) ? req.body.addphone : 'false';
                userInfos.success = "成功";
                userInfos.userPwd = "123456";
                userInfos.tokenId = arr.length + 1;
                userInfos.upDateAt = new Date();
                userInfos.userName = req.body.userName == "" ? 'false' : req.body.adduserName;
                req.query.action = 'adduser'
                if (userInfos.phone != 'false' && userInfos.userName != 'false' && userInfos.turename != 'false' && userInfos.email != "数据格式不对") {
                    //增加操作
                    handler("add", "studentList", userInfos, function (data) {
                        if (data.result.n == 0) {
                            res.send({"err": "抱歉，添加失败"});
                        } else {
                            res.send({"success": "添加成功"});
                        }
                    });
                } else {
                    res.send({"err": "抱歉，数据格式有误，添加失败"});
                }


            });
            break;
        case "usershow": // 显示学员列表
            var selector = {};
            if (req.body.userName) {
                selector.userName = {$regex: '.*' + req.body.userName + '.*'};
            }
            if (req.body.email) {
                selector.email = {$regex: '.*' + req.body.email + '.*'};
            }
            if (req.body.phone) {
                selector.phone = {$regex: '.*' + req.body.phone + '.*'};
            }
            //获取学员列表的数据总数
            handler("find", "studentList", null, function (arr) {
            	 
                if (isNullObj(selector)) {
                    selector = {
                        tokenId: {
                            $gt: arr.length - (parseInt(req.body.pageStart) * 6 - 6) - 6,
                            $lte: arr.length - (parseInt(req.body.pageStart) * 6 - 6)
                        }
                    };
                }
                //查询数据库获取结果集
                console.log(req.body.pageStart)
                console.log(arr)
                handler("find", "studentList", selector, function (data) {
                    if (data.length == 0) {
                        res.send({"err": "查询失败"});
                    } else {
                        var result = {
                            success: "成功",
                            data: {
                                pageSize: 6,
                                count: arr.length,
                                list: data
                            }
                        }
                        res.send(result);
                    }
                });
            });
            break;
        default:
            res.send({"err": '请求路径错误'});
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
//获取权限，获取课程列表等
router.get('/CourseHandler', function (req, res) {
    var action = req.query.action;
    switch (action) {
        case "getpower": // 获取管理员权限
            handler("find", "powers", null, function (data) {
                if (data.length == 0) {
                    res.send({err: "获取权限失败"});
                } else {
                    var result = {
                        success: "成功",
                        data: data
                    };
                    res.send(result);
                }
            });
            break;

        /*---------------------------------------------------------------------------*/
        /*关于课程的接口*/
        case "getcategory": // 获取课程专业分类目录
            handler("find", "catalogList", null, function (data) {
                if (data.length == 0) {
                    res.send({"err": "抱歉，获取课程分类列表失败"});
                } else {
                    var result = {
                        data: data,
                        success: "修改成功"
                    };
                    res.send(result);
                }
            });

            break;
        case "getcourse": // 获取 具体的课程信息
            //根据ID查询productList获得一条数据
            handler("find", "productList", {ID: parseInt(req.query.ID)}, function (data) {
                if (data.length == 0) {
                    res.send('{"err":"获取ID对应的课程失败"}');
                } else {
                    //课程的_id为directoryList的对应数据的CDid,根据CDid查询directoryList获取对应的数据集
                    handler("find","directoryList",{CDid:req.query._id}, function (da) { 
                    	console.log(req.query._id);
                    	console.log(data);
                    	console.log(data[0]._id);
                    	console.log(da)
                        var result = {
                            success: "获取成功",
                            data: {
                                courselist: data[0],
                                dirlist: da
                            }
                        };
                        res.send(result);


                    });

                }
            });
            break;

        case "deleteDirectory": // 删除目录
            req.query.action = 'find';
            //查询对应ID的目录数据条
            handler("find", "directoryList", {_id: new ObjectID(req.query._id)}, function (data) {
                //查询该目录对应的课程数据条
                handler("find", "productList", {_id: new ObjectID(req.query.CDid)}, function (result) {
console.log(req.query._id)
console.log(req.query.CDid)
                    //查询视频列表获得要处理的视频数据集
                    handler("find", "videoList", {Vmosaic: {$regex: '.*' + req.query._id + req.query.CDid + '.*'}}, function (da) {
                        //var dirIDProName = data[0].CDid+result[0]._id;
                        //迭代处理videoList的Vstate和Vmosaic
                        delDirVideo(req, res, req.query._id, req.query.CDid, result[0].Cname, da, function () {

                            //查询directoryList表获得对应ID的数据条
                            handler("find", "directoryList", {_id: new ObjectID(req.query._id)}, function (data) {

                                if (data.length == 0) {
                                    res.send('{"err":"删除目录失败"}');
                                } else {

                                    //删除操作
                                    handler("deletes", "directoryList", {_id: new ObjectID(req.query._id)}, function (da) {
                                        console.log(da);
                                        if (da.result.n == 0) {
                                            res.end('{"err":"删除失败"}');
                                        } else {
                                            //查询ID大于当前数据条ID的数据集
                                            handler("find", "directoryList", {ID: {$gt: parseInt(req.query.ID)}}, function (daa) {
                                                if (daa.length == 0) {
                                                    //如果数据集长度为0，则说明删除的是最后一个元素，无需处理后续数据的ID，直接查询该课程下的目录集并返回
                                                    handler("find", "directoryList", {CDid: req.query.CDid}, function (dat) {
                                                        var obj = {
                                                            data: {
                                                                list: dat,
                                                                success: "删除成功"
                                                            }
                                                        };
                                                        var str = JSON.stringify(obj);
                                                        res.end(str);


                                                    });
                                                } else {
                                                    //对ID大于当前数据条ID的数据集进行迭代处理，ID均-1
                                                    recUpdateID(req, res, 'directoryList', daa, function () {
                                                        //查询该课程下的所有目录并返回
                                                        handler("find", "directoryList", {CDid: req.query.CDid}, function (dat) {
                                                            var obj = {
                                                                success: "删除成功",
                                                                data: {
                                                                    list: dat
                                                                }
                                                            };
                                                            res.send(obj);
                                                        });
                                                    });
                                                }


                                            });


                                        }


                                    });

                                }
                            });

                        });
                    });
                });
            });
            break;

        case "addvideo":
            req.query.action = 'find'; //向目录中添加视频课件
            //查询目录列表列表获取当前目录的_id
            handler("find", "directoryList", {_id: new ObjectID(req.query._id)}, function (set) {

                //查询课程列表获取对应课程名
                handler("find", "productList", {_id: new ObjectID(req.query.CDid)}, function (data) {
                    if (data.length == 0) {
                        res.end('{"err":"抱歉，视频添加失败"}');
                    } else {
                        //查询视频列表获取绑定课程字段Vmosaic，用以拼接

                        handler("find", "videoList", {
                            _id: new ObjectID(req.query.Vid),
                            Vmosaic: {$regex: '(?!.*' + set._id + data[0]._id + '^.*$)'}
                        }, function (dat) {
                            //console.log({ID:parseInt(req.query.Vid),Vstate:{$regex:'(?!.*'+req.query.Did+data[0].Cname+'^.*$)'}});
                            if (dat.length == 0) {
                                res.end('{"err":"抱歉，该视频已添加"}');
                            } else {

                                var selectors;
                                if (!dat[0].Vstate && dat[0].Vmosaic) {
                                    selectors = [
                                        {"_id": new ObjectID(req.query.Vid)},
                                        {
                                            $set: {
                                                "Vstate": data[0].Cname,
                                                "Vmosaic": dat[0].Vmosaic.indexOf(set[0]._id + data[0]._id) == -1 ? dat[0].Vmosaic + "," + set[0]._id + data[0]._id : dat[0].Vmosaic
                                            }
                                        }

                                    ];
                                } else if (!dat[0].Vstate && !dat[0].Vmosaic) {
                                    selectors = [
                                        {"_id": new ObjectID(req.query.Vid)},
                                        {
                                            $set: {
                                                "Vstate": data[0].Cname,
                                                "Vmosaic": set[0]._id + data[0]._id
                                            }
                                        }

                                    ];
                                } else if (dat[0].Vstate && !dat[0].Vmosaic) {
                                    selectors = [
                                        {"_id": new ObjectID(req.query.Vid)},
                                        {
                                            $set: {
                                                "Vstate": dat[0].Vstate.indexOf(data[0].Cname) == -1 ? dat[0].Vstate + "," + data[0].Cname : dat[0].Vstate,
                                                "Vmosaic": set[0]._id + data[0]._id
                                            }
                                        }

                                    ];
                                } else {
                                    selectors = [
                                        {"_id": new ObjectID(req.query.Vid)},
                                        {
                                            $set: {
                                                "Vstate": dat[0].Vstate.indexOf(data[0].Cname) == -1 ? dat[0].Vstate + "," + data[0].Cname : dat[0].Vstate,
                                                "Vmosaic": dat[0].Vmosaic.indexOf(set[0]._id + data[0]._id) == -1 ? dat[0].Vmosaic + "," + set[0]._id + data[0]._id : dat[0].Vmosaic
                                            }
                                        }

                                    ];
                                }
                                console.log(selectors);
                                //更新视频列表对应数据的Vstate字段
                                handler("updates", "videoList", selectors, function (da) {
                                    if (da.length == 0) {
                                        res.end('{"err":"抱歉，更新失败"}');
                                    } else {
                                        //根据目录_id与课程_id的拼接后字串查询包含此字串的视频数据并将结果集返回
                                        handler("find", "videoList", {Vmosaic: {$regex: '.*' + set[0]._id + data[0]._id + '.*'}}, function (da) {
                                            var obj = {
                                                data: {
                                                    count: da.length,
                                                    list: da
                                                },
                                                success: "成功"
                                            }
                                            var str = JSON.stringify(obj);
                                            res.end(str);

                                        });


                                    }
                                });
                            }
                        });

                    }
                });
            });

            break;


        case "delvideo":// 删除目录下视频
            /*
             *  data: {
             courseId: GLOBAL.courseId,课程的id
             Did: GLOBAL.cataId, 目录的id
             Vid: coursewareId  视频的id
             },
             * */
            //查询目录列表获取对应的目录
            handler("find", "directoryList", {_id: new ObjectID(req.query._id)}, function (set) {
                //查询课程列表获取对应课程名
                handler("find", "productList", {_id: new ObjectID(req.query.CDid)}, function (data) {
                    if (data.length == 0) {
                        res.end('{"err":"抱歉，视频删除失败"}');
                    } else {
                        //查询视频列表获取绑定课程字段Vstate，用以拼接
                        handler("find", "videoList", {_id: new ObjectID(req.query.Vid)}, function (dat) {
                            if (dat.length == 0) {
                                res.end('{"err":"抱歉，该视频已删除"}');
                            } else {
                                //处理Vstate
                                var targetStr = data[0].Cname;
                                var targetArr = dat[0].Vstate.split(",");
                                var indexNumber = (function (arr, val) {
                                    for (var i = 0; i < arr.length; i++) {
                                        if (arr[i] == val) return i;
                                    }
                                    return -1;
                                })(targetArr, targetStr);
                                targetArr.splice(indexNumber, 1);
                                //处理Vmosaic
                                var targetStrVmosaic = set[0]._id + data[0]._id;
                                var targetArrVmosaic = dat[0].Vmosaic.split(",");
                                var indexNumberVmosaic = (function (arr, val) {
                                    for (var i = 0; i < arr.length; i++) {
                                        if (arr[i] == val) return i;
                                    }
                                    return -1;
                                })(targetArrVmosaic, targetStrVmosaic);
                                targetArrVmosaic.splice(indexNumberVmosaic, 1);

                                var selectors = [
                                    {"_id": new ObjectID(req.query.Vid)},
                                    {
                                        $set: {
                                            "Vstate": targetArr.join(","),
                                            "Vmosaic": targetArrVmosaic.join(",")
                                        }
                                    }

                                ];
                                //更新视频列表对应数据的Vstate字段
                                handler("updates", "videoList", selectors, function (da) {

                                    if (da.length == 0) {
                                        res.end('{"err":"抱歉，删除失败"}');
                                    } else {
                                        res.end('{"success":"删除成功"}');

                                    }
                                });
                            }
                        });

                    }
                });

            });

            break;

        /*  // 接口结束*/


        default:
            res.send({"err": '请求路径错误'});

    }
});

//////////////////////////////////////////////////////////////////////////////


router.post('/CourseHandler', function (req, res) {

    var action = req.query.action;
    switch (action) {
        case "show": //  显示课程列表
            var selector = {};
            if (req.body.searchText) {
                selector.Cname = {$regex: '.*' + req.body.searchText + '.*'};
            }
            if (req.body.CategoryOne) {
                selector.CategoryOne = {$regex: '.*' + req.body.CategoryOne + '.*'};
            }
            if (req.body.CategoryTwo) {
                selector.CategoryTwo = {$regex: '.*' + req.body.CategoryTwo + '.*'};
            }
            if (req.body.CategoryThree) {
                selector.CategoryThree = {$regex: '.*' + req.body.CategoryThree + '.*'};
            }
            handler("find", "productList", null, function (arr) {
                if (isNullObj(selector)) {
                    selector = {
                        ID: {
                            $gt: arr.length - (parseInt(req.body.pageStart) * 3 - 3) - 3,
                            $lte: arr.length - (parseInt(req.body.pageStart) * 3 - 3)
                        }
                    };
                }
                  console.log(selector);
                  console.log('我是课程！！！！');
                handler("find", "productList", selector, function (data) {
                    var obj = {
                        data: {
                            pageSize: 3,
                            count: arr.length,
                            list: data
                        }
                    }
                    var str = JSON.stringify(obj);
                    res.end(str);

                });
            });
            break;
        case "add": // 添加课程的基本信息
            handler("find", "productList", null, function (arr) {
                //组织课程信息并作一些校验
                console.log("请求中的课程信息1111111111111");
                console.log(req.body);
                var userInfos = {};
                userInfos.Cname = req.body.Cname;
                userInfos.Cdescribe = req.body.Cdescribe;
                userInfos.Cprice = parseInt(req.body.Cprice);
                userInfos.CategoryOne = req.body.CategoryOne;
                userInfos.CategoryTwo = req.body.CategoryTwo;
                userInfos.CategoryThree = req.body.CategoryThree;
                userInfos.Cpic = req.body.Cpic;
                userInfos.createAt = new Date();
                userInfos.ID = arr.length + 1;
                userInfos.upDateAt = new Date();
                userInfos.success = "添加成功";
                userInfos.isDelete = true;
                userInfos.isState = 1;
                userInfos.isTop = false;
                userInfos.onlineUser = 0;
                userInfos.Cdetails = req.body.Cdetails;
                userInfos.Cnumber = generateCode();
                if (userInfos.Cname && userInfos.Cdescribe && userInfos.Cprice >= 0) {
                    handler("add", "productList", userInfos, function (data) {
                        if (data.length == 0) {
                            res.end('{"err":"抱歉，添加失败"}');
                        } else {
                            var str = JSON.stringify(data.ops[0]);
                            res.end(str);
                        }
                    });
                } else {
                    var obj = {
                        data: userInfos,
                        err: "抱歉，添加失败,基本信息不能为空"
                    }
                    var str = JSON.stringify(obj);
                    res.end(str);
                    //res.end('{"err":"抱歉，添加失败,基本信息不能为空"}');
                }


            });


            break;


        case "AddDirectory": // 添加目录
            //根据操作手柄查询课程列表获得相应数据的_id
            handler("find", "productList", {"_id": new ObjectID(re.CDid)}, function (set) {
                //获取directoryList的当前条目数
                handler("find", "directoryList", null, function (arr) {
                    var objDirectory = {
                        CDName: req.body.CDName,
                        CDid: req.body.CDid,
                        CourseNumber: 0,
                        ID: arr.length + 1
                    }
                    if (objDirectory.CDName && objDirectory.CDid) {
                        //新增操作
                        handler("add", "directoryList", objDirectory, function (data) {
                            if (data.ops.length == 0) {
                                res.end('{"err":"抱歉，目录添加失败"}');
                            } else {
                                //根据相应课程列表的_id将directoryList列表中与其对应的目录结果集返回
                                handler("find", "directoryList", {CDid: req.body.CDid}, function (data) {
                                    if (data.length == 0) {
                                        res.end('{"err":"抱歉，目录添加失败"}');
                                    } else {
                                        var obj = {
                                            data: {
                                                list: data,
                                                success: "添加成功"
                                            }
                                        }
                                        var str = JSON.stringify(obj);
                                        res.end(str);
                                    }
                                });
                            }
                        });
                    } else {
                        res.end('{"err":"抱歉，目录添加失败,目录信息不能为空"}');
                    }
                });
            });
            break;


        case "updateDirectory": // 编辑目录
            var selectors = [
                {"_id": new ObjectID(req.body._id)},
                {
                    "$set": {
                        CDName: req.body.CDName
                    }
                }

            ];
            //directoryList的update操作
            handler("updates", "directoryList", selectors, function (data) {
                if (data.length == 0) {
                    res.end('{"err":"抱歉，目录更新失败"}');
                } else {
                    //根据请求参数查询课程列表相应课程的_id
                    handler("find", "productList", {_id: new ObjectID(req.body.CDid)}, function (set) {

                        //根据课程_id将绑定在它下面的目录结果集返回
                        handler("find", "directoryList", {CDid: req.body.CDid}, function (data) {
                            if (data.length == 0) {
                                res.end('{"err":"抱歉，目录添加失败"}');
                            } else {
                                var obj = {
                                    data: {
                                        list: data,
                                        success: "添加成功"
                                    }
                                }
                                var str = JSON.stringify(obj);
                                res.end(str);
                            }
                        });
                    });

                }
            });
            break;


        case "update": // 编辑课程信息

            var selectors = [
                {"_id": new ObjectID(req.body._id)},
                {
                    "$set": {
                        Cname: req.body.Cname,
                        Cdescribe: req.body.Cdescribe,
                        Cprice: parseInt(req.body.Cprice),
                        CategoryOne: req.body.CategoryOne,
                        CategoryTwo: req.body.CategoryTwo,
                        CategoryThree: req.body.CategoryThree,
                        Cpic: req.body.Cpic,
                        upDateAt: new Date(),
                        Cdetails: req.body.Cdetails
                    }
                }

            ];
            handler("updates", "productList", selectors, function (data) {
                if (data.length == 0) {
                    res.end('{"err":"抱歉，更新失败"}');
                } else {
                    res.end('{"success":"更新成功"}');
                }
            });
            break;


        case "state": // 课程的状态的控制 草稿 上架 下架

            var ID = parseInt(req.body.ID);
            //查询数据库获得当前数据对应的state状态
            handler("find", "productList", {"ID": ID}, function (data) {
              console.log('我获取的ID')
              console.log(ID)
                if (data.length == 0) {
                    res.end('{"err":"抱歉，处理上下架失败"}');
                } else {
                	console.log(data)
                    var state;
                    if (data[0].isState == 1) {
                        state = 2;
                    } else if (data[0].isState == 2) {
                        state = 3;
                    } else {
                        state = 1;
                    }
                    var selectors = [
                        {ID: ID},
                        {
                            $set:{
                                isState: state
                            }
                        }

                    ];
                    console.log(state)
                    //跟具当前状态做切换操作
                    handler("updates", "productList", selectors, function (data) {
                        if (data.length == 0) {
                            res.end('{"err":"抱歉，更新失败"}');
                        } else {
                            res.end('{"success":"更新成功"}');
                        }
                    });
                }
            });
            break;


        case "top":// 对课程的置顶
            var ID = parseInt(req.body.ID);
            //查询对应ID的document获得当前数据的isTop值
            handler("find", "productList", {"ID": ID}, function (data) {

                if (data.length == 0) {
                    res.end('{"err":"抱歉，处理置顶失败"}');
                } else {
                    var state;
                    if (data[0].isTop) {
                        state = false;
                    } else {
                        state = true;
                    }
                    var selectors = [
                        {ID: ID},
                        {
                            $set: {
                                isTop: state
                            }
                        }

                    ];
                    //根据当前数据的isTop值做切换操作
                    handler("updates", "productList", selectors, function (data) {
                        if (data.length == 0) {
                            res.end('{"err":"抱歉，更新失败"}');
                        } else {
                            res.end('{"success":"更新成功"}');
                        }
                    });
                }
            });

            break;


        case "delete": // 删除

            if (flagInt === 0) {
                //获取该条课程信息
                handler("find", "productList", {_id: new ObjectID(req.body._id)}, function (set) {
                    if (set.length !== 0) {
                        flagInt++;
                        //迭代处理该课程对应的目录---删除目录并处理与之绑定的视频
                        delProDir(req, res, set[0]._id, function () {
                            //删除对应ID的document
                            handler("deletes", "productList", {_id: new ObjectID(req.body._id)}, function (data) {
                                if (data.result.n == 0) {
                                    res.end('{"err":"删除失败"}');
                                } else {
                                    //查询操作ID大于当前ID的数据集
                                    handler("find", "productList", {ID: {$gt: parseInt(req.body.ID)}}, function (da) {
                                        //迭代处理数据集中的每条数据的ID
                                        recUpdateID(req, res, "productList", da, function () {
                                            flagInt--;
                                            res.end('{"success":"更新成功"}');
                                        });
                                    });
                                }
                            });

                        });
                    } else {
                        res.end('{"err":"删除失败"}');
                    }

                });

            } else {
                flagInt = 0;
                res.end('{"state":"稍后操作"}');
            }

            break;

        default:
            res.send({"err": '请求路径错误'});

    }
});

//////////////////////////////////////////////////////////////////////
//清除封面图片
router.get('/UpLoadPicHandler', function (req, res) {
    if (req.query.action !== "delete") {
        var obj = {
            cacheName: '',
            err: "失败"
        }
        res.send(obj);
    }
    ;
    //删除封面图片
    handler("deletes", "coverList", {pathName: req.query.pathName}, function (data) {
    	console.log(data);
    	console.log(data);
        var obj = {
            result: data,
            success: "成功"
        }
        res.send(obj);
    });

});
//图片上传的处理逻辑
router.post('/UpLoadPicHandler', function (req, res) {
    console.log("123456");
    console.log(req.body);
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "temporary/";
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.maxFields = 1000;
    //将文件暂存到项目根目录的temporary文件夹下
    form.parse(req, function (error, fields, files) {
        //生成封面图片在数据库中的索引
        var pathName = generateCode() + "pic";
        // console.log(files);
        //读取暂存文件生成16进制的流


        var readableStream = fs.createReadStream(files[Object.getOwnPropertyNames(files)[0]].path);
        var chunks = [];
        var size = 0;
        readableStream.on('data', function (chunk) {
            chunks.push(chunk);
            size += chunk.length;
        });

        readableStream.on('end', function () {
            var buf = Buffer.concat(chunks, size);
            var pictures = {
                pathName: pathName,
                contents: buf
            }
            //将图片流存入coverList变并删除暂存文件
            handler("add", "coverList", pictures, function (data) {
                if (data.length == 0) {
                    res.end('{"err":"抱歉，上传图片失败"}');
                } else {
                    fs.unlink(files[Object.getOwnPropertyNames(files)[0]].path, function (err) {
                        if (err) return console.log(err);

                    })

                }
            });
        });
        var target = files[Object.getOwnPropertyNames(files)[0]].path.split('.');
        if (target[target.length - 1] == 'jpg' || target[target.length - 1] == 'png' || target[target.length - 1] == 'gif' || target[target.length - 1] == 'jpeg') {
            var obj = {
                cacheName: '/DownLoadPicHandler?pathName=' + pathName,
                success: "成功",
                pictures:pictures
            }
            var str = JSON.stringify(obj);
            res.end(str);
        } else {
            var obj = {
                cacheName: '/DownLoadPicHandler?pathName=' + pathName,
                err: "失败",
                pictures:pictures
            }
            var str = JSON.stringify(obj);
            res.end(str);
        }

    });
});


/*视频列表  */
/////////////////////////////////////////////////////////////////////
//上传视频
router.post('/UpLoadVideoHandler', function (req, res) {
    var form = new formidable.IncomingForm(); //创建Formidable.IncomingForm对象
    form.encoding = 'utf-8'; //设置表单域的编码
    form.uploadDir = "temporary/video/"; // 设置上传文件存放的文件夹
    form.keepExtensions = true; // 设置该属性为true可以使得上传的文件保持原来的文件的扩展名
    form.maxFieldsSize = 100 * 1024 * 1024; // 限制所有存储表单字段域的大小（除去file字段），如果超出，则会触发error事件，默认为2M
    form.maxFields = 1000; // 设置可以转换多少查询字符串，默认为1000
    // 方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
    form.parse(req, function (error, fields, files) {
        if (!error) {
            var result = {
                success: "成功",
                cacheName: files[Object.getOwnPropertyNames(files)[0]].path
            };
            res.send(result);
        } else {
            var result = {
                err: "上传失败"
            };
            res.send(result);
        }
    });
});

router.post('/VideoHandler', function (req, res) {
    var action = req.query.action;
    switch (action) { // 添加视频
        case "add":
            handler('find', "videoList", null, function (arr) {
                //组织视频信息并作一些校验
                var videos = {};
                videos.Vname = req.body.Vname;
                videos.Vtime = req.body.Vtime;
                videos.Vurl = req.body.Vurl;
                videos.ID = arr.length + 1;
                videos.Vstate = "";
                videos.createAt = new Date();
                videos.isFinish = false;
                videos.isViewed = false;
                videos.updateAt = new Date();
                videos.Vmosaic = "";
                if (videos.Vname && videos.Vtime && videos.Vurl) {
                    handler('add', "videoList", videos, function (data) {
                        if (data.result.n == 1) {
                            res.send({success: "成功"});
                        } else {
                            res.send({"err": "抱歉，添加失败"});
                        }
                    });
                } else {
                    res.send({"err": "抱歉，视频添加失败,基本信息不能为空"});
                }


            });
            break;
        case "update":// 视频的更新
            //根据ID查询对应的视频document
            handler("find", "videoList", {ID: parseInt(req.body.ID)}, function (data) {
                if (data.length == 0) {
                    res.end('{"err":"抱歉，系统中查不到该视频"}');
                } else {
                    //如果对视频做更新操作是更改了视频源则删除原视频源
                    if (data[0].Vurl !== req.body.Vurl) {
                        fs.unlink(data[0].Vurl, function (err) {
                            if (err) return console.log(err);
                        })
                    }
                    var selectors = [
                        {"ID": parseInt(req.body.ID)},
                        {
                            "$set": {
                                Vname: req.body.Vname,
                                Vtime: req.body.Vtime,
                                Vurl: req.body.Vurl,
                                upDateAt: new Date()
                            }
                        }

                    ];
                    //根据传入数据更新视频列表
                    handler('updates', "videoList", selectors, function (da) {
                        if (da.result.n == 1) {
                            res.send({"success": "更新成功"});
                        } else {
                            res.send({"err": "抱歉，更新失败"});
                        }
                    });
                }
            });


            break;
        case "showlist"://显示列表
            var selector = {};
            //如有模糊查询条件则以其为筛选器
            if (req.body.searchText) {
                selector.Vname = {$regex: '.*' + req.body.searchText + '.*'};
            }
            //查询videoList列表获得总数据条数
            handler('find', "videoList", null, function (arr) {
                if (isNullObj(selector)) {
                    selector = {
                        ID: {
                            $gt: arr.length - (parseInt(req.body.pageStart) * 3 - 3) - 3,
                            $lte: arr.length - (parseInt(req.body.pageStart) * 3 - 3)
                        }
                    };
                }
                //根据筛选器查询videoList获得结果集
                handler('find', "videoList", selector, function (data) {
                    if (data.length == 0) {
                        res.end('{"err":"系统中还没有视频"}');
                    } else {
                        var rusult = {
                            data: {
                                pageSize: 3,
                                count: arr.length,
                                list: data,
                                pageStart: req.body.pageStart
                            },
                            success: "成功"
                        };

                        res.send(rusult);
                    }
                });
            });
            break;
        default:
            res.send({"err": '请求路径错误'});
    }
});
router.get('/VideoHandler', function (req, res) {
    var action = req.query.action;
    switch (action) {
        case "delete": // 视频删除
            //根据ID查询当前视频document获得当前视频的Vurl字段
            handler("find", "videoList", {ID: parseInt(req.query.ID)}, function (data) {
                if (data.length == 0) {
                    res.end('{"err":"抱歉，系统中查不到该视频"}');
                } else {
                    //删除系统中该视频文件
                    fs.unlink(data[0].Vurl, function (err) {
                        if (err) return console.log(err);
                    });
                    req.query.action = 'delete';
                    //删除数据库中与该视频对应的数据
                    handler("deletes", "videoList", {ID: parseInt(req.query.ID)}, function (data) {
                        if (data.result.n == 0) {
                            res.end('{"err":"删除失败"}');
                        } else {
                            //迭代处理其余视频文件的操作手柄-ID均减1
                            handler("find", "videoList", {ID: {$gt: parseInt(req.query.ID)}}, function (da) {
                                recUpdateID(req, res, "videoList", da);
                            });
                        }
                    });

                }
            });
            break;
        case "finddir": // 课程目录下绑定的视频

            handler("find", "directoryList", {CDid: req.query.CDid}, function (data) {
                if (data.length == 0) {
                    var obj = {
                        data: {
                            list: []
                        },
                        err: "未找到与该课程对应的目录"
                    };
                    res.send(obj);
                } else {
                    var obj = {
                        data: {
                            list: data
                        },
                        success: "成功"
                    };
                    res.send(obj);
                }
            });

            break;

        case "showdir": // 课程下目录的请求
            //根据ID获取对应的目录document
            handler("find", "directoryList", {_id: new ObjectID(req.query._id)}, function (data) {
                if (data.length == 0) {
                    var obj = {
                        err: "查询失败",
                        data: {
                            list: []
                        }
                    };
                    res.send(obj);
                } else {
                    //根据当前目录document的CDid查询出对应的课程信息  这里没有用 result上的CDid的值
                    handler("find", "productList", {_id: new ObjectID(req.query.CDid)}, function (result) {
                        //将目录与课程信息的_id字段拼接成串，根据这个查询对应的视频数据集
                        var strstr = data[0]._id.toString() + data[0].CDid;
                        handler("find", "videoList", {Vmosaic: {$regex: '.*' + strstr + '.*'}}, function (da) {
                            //console.log(data[0]._id+result[0]._id);
                            var obj = {
                                data: {
                                    list: da
                                },
                                success: "成功"
                            }
                            var str = JSON.stringify(obj);
                            res.end(str);
                        });
                    });
                }
            });
            break;

        case "show": // 课程编辑页面视频列表的请求
            var selector = {};
            if (req.query.searchText) {
                selector.Vname = {$regex: '.*' + req.query.searchText + '.*'};
            }
            //查询videoList获得总数据条数
            handler("find", "videoList", null, function (arr) {
                if (isNullObj(selector)) {
                    selector = {
                        ID: {
                            $gt: arr.length - (parseInt(req.query.pageStart) * req.query.pageSize - req.query.pageSize) - req.query.pageSize,
                            $lte: arr.length - (parseInt(req.query.pageStart) * req.query.pageSize - req.query.pageSize)
                        }
                    };
                }
                console.log(arr);
                //分页查询当前三条数据
                handler("find", "videoList", selector, function (data) {
                	console.log(selector);
                	console.log(req.query.pageStart);
                	console.log(req.query.pageSize);
                	
                    if (data.length == 0) {
                        res.end('{"err":"抱歉，系统中还未添加任何视频"}');
                    } else {
                        var obj = {
                            success: "查询成功",
                            data: {
                                pageSize: 3,
                                count: arr.length,
                                list: data
                            }
                        }
                        var str = JSON.stringify(obj);
                        res.end(str);
                    }
                });
            });
            break;
        default:
            res.send({"err": '请求路径错误'});
    }
});


module.exports = router;