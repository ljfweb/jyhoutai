/**
 * Created by guowenqiang on 2016/10/22.
 */
//实现功能接口
var express = require('express'),
    router = express.Router(),
    handler = require('./dbhandler.js'),
    formidable = require('formidable'),
    crypto = require('crypto');
//var StringDecoder = require('string_decoder').StringDecoder;
//var decoder = new StringDecoder('utf8');
//var Q = require('q');
//var images = require("images");
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;
function User(user) {
  this.id=user.id;
  this.name = user.name;
  this.password = user.password;
  this.veri = user.veri;
};
var flagInt = 0;
//迭代处理删除后的系统管理员各人员的tokenId
var recUpdate = function(req, res, collections,data){
  if(data.length===0){
    res.end('{"success":"删除成功"}');
  }else{
    var selectors = [
      {"userName":data[0].userName},
      {$set:
      {
        "tokenId":data[0].tokenId-1
      }
      }

    ];

    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){

      data.shift();
     if(data.length!=0){
        //console.log(data);
        recUpdate(req, res, collections,data);
      }else{
        res.end('{"success":"更新成功"}');
      }
    });
  }
}
//迭代处理课程列表删除后的ID
var recUpdateID = function(req, res, collections,data,fn){
  if(data.length===0){
    res.end('{"success":"删除成功"}');
  }else{
    var selectors = [
      {"_id":data[0]._id},
      {$set:
      {
        "ID":data[0].ID-1
      }
      }

    ];
    //console.log(fn);
    req.query.action = 'update';
    handler(req, res, collections, selectors,function(dat){
      data.shift();
      if(dat.length==0){
        res.end('{"err":"抱歉，更新失败"}');
      }else if(data.length!=0){
        //console.log(data);
        recUpdateID(req, res, collections,data,fn);
      }else{

        if(fn){
          fn();
        }else{
          res.end('{"success":"更新成功"}');
        }

      }
    });
  }
}
//迭代删除目录绑定的视频
/*
*  dirID:目录_id
*  proID:课程_id
*  VstateName:课程名称
*  data  需要处理的视频数据集
* */
var delDirVideo = function(req, res, dirID,proID,VstateName,data,fn){
  var dirIDProName = dirID+proID ;
  if(data.length===0){
    fn();
  }else{
            req.query.action='find';
            //查询与课程ID对应的目录条数看与该课程绑定的目录是否只剩一条否则不改变videoList的Vstate字段
            handler(req, res, "directoryList", {"CDid":proID},function(set){
              //console.log(set);
              //拆分Vstate去除其中的已删除课程名
              var targetArrVstate = data[0].Vstate.split(",");
              if(set.length===1){
                var indexNumberVstate = (function(arr,val) {
                  for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == val) return i;
                  }
                  return -1;
                })(targetArrVstate,VstateName);
                targetArrVstate.splice(indexNumberVstate,1);
              }
              //拆分Vmosaic去除其中的dirIDProName
              var targetArrVmosaic = data[0].Vmosaic.split(",");
              var indexNumberVmosaic = (function(arr,val) {
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == val) return i;
                }
                return -1;
              })(targetArrVmosaic,dirIDProName);
              targetArrVmosaic.splice(indexNumberVmosaic,1);

              var selectors = [
                {"_id":data[0]._id},
                {$set:
                {
                  "Vstate":targetArrVstate.join(","),
                  "Vmosaic":targetArrVmosaic.join(",")
                }
                }

              ];
              //console.log(selectors);
              req.query.action='update';
              //更新视频列表对应数据的Vstate与Vmosaic字段
              handler(req, res, "videoList", selectors,function(da){
                data.shift();
                if(data.length==0){
                  fn();
                }else if(data.length!=0){
                  delDirVideo(req, res, dirID,proID,data,fn);

                }
              });
            });

  }
}
//迭代删除课程绑定的目录
/*
 proID 课程的_id
* */
var delProDir = function(req, res,proID,fn){
    req.query.action = 'find';
  //查询productList，获取对应ID的课程信息的_id和课程名
  handler(req, res, "productList",{_id:proID} ,function(das){
    //获取对应课程_id的目录集directoryList
    handler(req, res, "directoryList",{CDid:proID} ,function(da){
      if(da.length!==0){
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
        handler(req, res, "videoList",{ Vmosaic: { $regex: '.*'+da[0]._id+das[0]._id+'.*' } } ,function(daa){
          delDirVideo(req, res, da[0]._id,das[0]._id,das[0].Cname,daa,function(){
            //删除该目录
            req.query.action = 'delete';
            handler(req, res, "directoryList",{_id:da[0]._id} ,function(dat){
              req.query.action = 'find';
              //再次验证看该课程下是否还有目录，如果有就迭代处理
              handler(req, res, "directoryList",{CDid:proID} ,function(data){
                if(data.length===0){
                  fn();
                }else{
                  delProDir(req, res,proID,fn);
                }
              });
            });
          });

        });

      }else{
        fn();
      }
    });

  });


}
//判断对象是否为空
var isNullObj=function(obj){
  for(var i in obj){
    if(obj.hasOwnProperty(i)){
      return false;
    }
  }
  return true;
}
//生成课程代码
var generateCode = function(){
  var letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var numbers = ['0','1','2','3','4','5','6','7','8','9'];
  var str = "";
  for(var i=0;i<8;i++){
    if(i<4){
      str+= letters.splice(parseInt(Math.random()*(letters.length)),1);
    }else{
      str+= numbers.splice(parseInt(Math.random()*(numbers.length)),1);
    }
  }
  return str;
}
//客户端获取验证码字符及校验验证码接口
router.get('/AdminLoginAndRegHandler',function(req, res){
  console.log("-----",req.query)
  if(req.query.action==="verification"){
    var randomNum=function (min,max){//生成随机数
      return Math.floor( Math.random()*(max-min)+min);
    };
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    var returnStr = "";
    for(var i=0; i<4; i++){
      var txt = str[randomNum(0,str.length)];
      returnStr+=txt;
    }
    var newUser = new User({
            name: "",
            password:"",
            id:"",
            veri:returnStr
           });
      req.session.user = newUser;
        console.log("给session赋值");
      console.log(req.session);
    res.end('{"success":"true","data":"'+returnStr+'"}');
  }else if(req.query.action==="checkVerification"){
    //console.log("从session中取值");
    //console.log(req.session);
    if(req.session.user&&req.query.veri===req.session.user.veri){
        res.end('{"success":"验证码正确"}');
      }else{
        res.end('{"err":"验证码错误"}');
      }
  }

});
//登录请求,添加系统人员verification
router.post('/AdminLoginAndRegHandler', function (req, res) {
  if(req.query.action=='login'){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    handler(req, res, "Administor", {userName: req.body.userName,password:password},function(data){
      console.log("77777777778");
      console.log(data);
      if(data.length===0){
        res.end('{"err":"抱歉，系统中并无该用户，如有需要，请向管理员申请"}');
      }else if(data.length!==0&&data[0].password===password){
        req.session.user.name = req.body.userName;
        req.session.user.password = password;
        req.session.user.id = data[0]._id;
        console.log(req.session)
        res.send({
          success:"登录成功",
          tokenId:req.session.user.id  //返回用户id 
        });


      }

    });

  }else if(req.query.action=='add'){
    req.query.action='show'
    handler(req, res, "Administor", null,function(arr){
      var md5 = crypto.createHash('md5');
      //组织用户信息并作一些校验
      var userInfos = {};
      userInfos.createAt = new Date();
      userInfos.isdelete = /^fcgl/.test(req.body.turename)?false:true;
      userInfos.password =  md5.update(req.body.password).digest('base64');
      userInfos.phone =/^1\d{10}$/.test(parseInt(req.body.phone))?req.body.phone:'false';
      userInfos.power = req.body.power;
      userInfos.powerCode = req.body.power=="系统管理员"?1:2;
      userInfos.success = "成功";
      userInfos.tokenId = arr.length+1;
      userInfos.upDateAt = new Date();
      userInfos.userName = req.body.userName==""?'false':req.body.userName;
      userInfos.turename = req.body.turename==""?'false':req.body.turename;
      req.query.action='add'
      if( userInfos.phone!='false'&& userInfos.userName!='false'&&userInfos.turename!='false'){
        handler(req, res, "Administor",userInfos,function(data){
          //console.log(data);
          if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
          }else{

            res.end('{"success":"注册成功"}');
          }
        });
      }else{
        res.end('{"err":"抱歉，添加失败"}');
      }


    });
  }else{
    res.end('{"err":"抱歉，POST AdminLoginAndRegHandler下无此路由"}');
  }

});

//管理员列表(show,delete)
router.get('/AdminHandler',function(req,res){
  if(req.query.action=='show'){
    handler(req, res, "Administor", null,function(arr){
      console.log(req.query.searchText);
      console.log(req.query.pageStart);
      console.log(typeof req.query.pageStart);
      var selector = !req.query.searchText?{tokenId:{$gt:arr.length-(parseInt(req.query.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.query.pageStart)*3-3)}}:{ turename: { $regex: '.*'+req.query.searchText+'.*', $options: 'i' } } ;
     console.log(selector);
      handler(req, res, "Administor",selector ,function(data){
        console.log(data);
        if(data.length==0){
          res.end('{"err":"抱歉，系统中查不到人员"}');
        }else{
          var obj = {
            data:{
              pageSize:3,
              count:arr.length,
              list:data
            }
          }
          var str = JSON.stringify(obj);
          res.end(str);
        }
      });
    });

  }else if(req.query.action=='delete'){
    //删除操作
    handler(req, res, "Administor",{tokenId:parseInt(req.query.tokenId),isdelete:true},function(data){
      //console.log(data);
      if(data.result.n==0){
        res.end('{"err":"删除失败"}');
      }else{
        req.query.action = 'show';
        //获取tokenId大于当前tokenId的数据集，并迭代处理管理员列表的tokenId
        handler(req, res, "Administor",{tokenId:{$gt:parseInt(req.query.tokenId)}},function(da){

          recUpdate(req, res,"Administor",da);
        });
        res.end('{"success":"更新成功"}');
      }
    });
  }else if(req.query.action=='lockuser'){
    //获取与tokenId对应的该条数据
    req.query.action = 'show';
    console.log(req.query.tokenId);
    handler(req, res, "studentList",{tokenId:parseInt(req.query.tokenId)},function(da){
      req.query.action = 'update';
      var selectors = [
        {tokenId:parseInt(req.query.tokenId)},
        {$set:
        {
          isstate:da[0].isstate?false:true
        }
        }

      ];
      //切换当前字段isstate的状态
      handler(req, res, "studentList", selectors,function(data){
        if(data){
          res.end('{"success":"操作成功"}');
        }else{

          res.end('{"err":"抱歉，冻结失败"}');
        }
      });
    });
  }else if(req.query.action=='quit'){
    if(req.session.user){
      req.session.user={};
    }
    res.end('{"success":"退出成功"}');

  }else{

    res.end('{"err":"抱歉，GET AdminHandler下无此路由"}');
  }
});
//管理员列表update
router.post('/AdminHandler',function(req,res){
  if(req.query.action=='update'){
    var selectors = [
      {"tokenId":parseInt(req.body.tokenId)},
      {$set:
        {
          "userName":req.body.userName,
          "turename":req.body.turename,
          "phone":req.body.phone,
          "power":req.body.power,
          "upDateAt":new Date()
        }
      }

    ];
    //console.log(selectors);
    handler(req, res, "Administor", selectors,function(data){
      if(data.length==0){
        res.end('{"err":"抱歉，更新失败"}');
      }else{
        res.end('{"success":"更新成功"}');
      }
    });

    //登入后返回当前用户的详细信息
  }else if(req.query.action=='returnuserinfo'){
    console.log('我是用户信息110');
    console.log(req.session);
    console.log('我是用户信息110');
    req.query.action = 'find';
    //从session中拿去当前用户的用户名和密码
    var sessionUserName = req.session.user.name;
    var sessionPassword = req.session.user.password;
    var sessionId = new ObjectID(req.session.user.id);
    //console.log(sessionId);
    handler(req, res, "Administor", {"_id":sessionId},function(data){
      if(data.length==0||data.length>1){
        res.end('{"err":"抱歉，系统故障"}');
      }else{

        var str = JSON.stringify(data[0]);
        console.log(str);
        res.end(str);
      }

    });
  }else if(req.query.action=='updatepass'){//安全中心，修改密码
    //对原密码加密
    //console.log(req.body.userPwd);
   // console.log(req.session.user);
    var md5 = crypto.createHash('md5');
    var passwordMd5 = md5.update(req.body.userPwd).digest('base64');
    console.log(passwordMd5);
    //判断原密码是否正确
    if(req.session.user.password!=passwordMd5){
      res.end('{"err":"密码错误"}');
    }else{
      var md56 = crypto.createHash('md5');
     var newPwd = req.session.user.password = md56.update(req.body.newPwd).digest('base64');
      var selectors = [
        {"userName":req.session.user.name},
        {$set:
        {
          "password":newPwd,
          "upDateAt":new Date()
        }
        }

      ];
      //将同样加密过的新密码更新到数据库
      handler(req, res, "Administor", selectors,function(data){
        if(data.length==0){
          res.end('{"err":"密码更新失败"}');
        }else{
          res.end('{"success":"更新成功"}');
        }
      });
    }
    //添加学员信息
  }else if(req.query.action=='adduser'){
    req.query.action='usershow';
    //获取学员列表的数据总数
    handler(req, res, "studentList", null,function(arr){
      //组织学员信息并作一些校验
      var userInfos = {};
      userInfos.createAt = new Date();
      userInfos.email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(req.body.addemail)?req.body.addemail:"数据格式不对";
      userInfos.isstate = false;
      userInfos.phone =/^1\d{10}$/.test(parseInt(req.body.addphone))?req.body.addphone:'false';
      userInfos.success = "成功";
      userInfos.userPwd = "123456";
      userInfos.tokenId = arr.length+1;
      userInfos.upDateAt = new Date();
      userInfos.userName = req.body.userName==""?'false':req.body.adduserName;
      req.query.action='adduser'
      if( userInfos.phone!='false'&& userInfos.userName!='false'&&userInfos.turename!='false'&&userInfos.email!="数据格式不对"){
        //增加操作
        handler(req, res, "studentList",userInfos,function(data){
          //console.log(data);
          if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
          }else{

            res.end('{"success":"添加成功"}');
          }
        });
      }else{
        res.end('{"err":"抱歉，数据格式有误，添加失败"}');
      }


    });
    //  获取学员列表信息
  }else if(req.query.action=='usershow'){
    var selector={};
    if(req.body.userName){
      selector.userName={$regex:'.*'+req.body.userName+'.*'};
    }
    if(req.body.email){
      selector.email={$regex:'.*'+req.body.email+'.*'};
    }
    if(req.body.phone){
      selector.phone={$regex:'.*'+req.body.phone+'.*'};
    }
    //获取学员列表的数据总数
    handler(req, res, "studentList", null,function(arr){
     if(isNullObj(selector)){
       selector={tokenId:{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}};
     }
      //查询数据库获取结果集
      handler(req, res, "studentList",selector ,function(data){
          var obj = {
            data:{
              pageSize:3,
              count:arr.length,
              list:data
            }
          }
          var str = JSON.stringify(obj);
          res.end(str);

      });
    });
  }else{
    res.end('{"err":"抱歉，POST,AdminHandler无此路由"}');
  }

});
//获取权限，获取课程列表等
router.get('/CourseHandler',function(req,res){
  if(req.query.action=='getpower'){
      handler(req, res, "powers",null,function(data){
        if(data.length==0){
          var obj = {
            err:"获取权限失败",
            data:data
          };
          var str = JSON.stringify(obj);
          res.end(str);
        }else{
          var obj = {
            success:"成功",
            data:data
          };
          var str = JSON.stringify(obj);
          res.end(str);
        }
      });

  //获取专业目录
  }else if(req.query.action=='getcategory'){
    handler(req, res, "catalogList",null,function(data){
      if(data.length==0){
        res.end('{"err":"抱歉，获取课程分类列表失败"}');
      }else{
        var obj = {
          data:data,
          success:"修改成功"
        };
        var str = JSON.stringify(obj);
        res.end(str);
      }
    });
  }else if(req.query.action=='getcourse'){
    //根据ID查询productList获得一条数据
    handler(req, res, "productList", {ID:parseInt(req.query.ID)},function(data){
      if(data.length==0){
        res.end('{"err":"获取ID对应的课程失败"}');
      }else{
        //课程的_id为directoryList的对应数据的CDid,根据CDid查询directoryList获取对应的数据集
        handler(req, res, "directoryList", {CDid:data[0]._id},function(da){
            var obj = {
              data:{
                success:"获取成功",
                courselist:data[0],
                dirlist:da
              }

            };
            var str = JSON.stringify(obj);
            res.end(str);


        });

      }
    });
    /*
    *
    * *
     *  dirIDProName:目录ID与课程名称的拼合串
     *  data  需要处理的视频数据集
     *
    var delDirVideo = function(req, res, dirIDProName,data,fn){
    * */
    //删除课程下的目录
  }else if(req.query.action=='deleteDirectory'){
    req.query.action = 'find';
    //查询对应ID的目录数据条
    handler(req, res, "directoryList",{_id:new ObjectID(req.query._id)} ,function(data){
        //查询该目录对应的课程数据条
        handler(req, res, "productList",{_id:new ObjectID(req.query.CDid)},function(result){

          //查询视频列表获得要处理的视频数据集
          handler(req, res, "videoList",{Vmosaic:{$regex:'.*'+req.query._id+req.query.CDid+'.*'}} ,function(da){
            //var dirIDProName = data[0].CDid+result[0]._id;
            //迭代处理videoList的Vstate和Vmosaic
            delDirVideo(req, res, req.query._id,req.query.CDid,result[0].Cname,da,function(){
              req.query.action = 'find';
              //查询directoryList表获得对应ID的数据条
              handler(req, res, "directoryList",{_id:new ObjectID(req.query._id)},function(data){

                if(data.length==0){
                  res.end('{"err":"删除目录失败"}');
                }else{
                  req.query.action = 'deleteDirectory';
                  //删除操作
                  handler(req, res, "directoryList", {_id:new ObjectID(req.query._id)},function(da){
                    console.log(da);
                    if(da.result.n==0){
                      res.end('{"err":"删除失败"}');
                    }else{
                      req.query.action = 'find';
                      //查询ID大于当前数据条ID的数据集
                      handler(req, res, "directoryList",{ID:{$gt:parseInt(req.query.ID)}},function(daa){
                        if(daa.length==0){
                          //如果数据集长度为0，则说明删除的是最后一个元素，无需处理后续数据的ID，直接查询该课程下的目录集并返回
                          handler(req, res, "directoryList",{CDid:req.query.CDid},function(dat){
                            var obj = {
                              data:{
                                list:dat,
                                success:"删除成功"
                              }
                            };
                            var str = JSON.stringify(obj);
                            res.end(str);


                          });
                        }else{
                          //对ID大于当前数据条ID的数据集进行迭代处理，ID均-1
                          recUpdateID(req, res, 'directoryList',daa,function(){
                            req.query.action = 'find';
                            //查询该课程下的所有目录并返回
                            handler(req, res, "directoryList",{CDid:req.query.CDid},function(dat){
                              var obj = {
                                data:{
                                  list:dat,
                                  success:"删除成功"
                                }
                              };
                              var str = JSON.stringify(obj);
                              res.end(str);


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

    //课程编辑过程中添加视频
  }else if(req.query.action=='addvideo'){
    //console.log(5454)
    req.query.action='find';
    //查询目录列表列表获取当前目录的_id
    handler(req, res, "directoryList", {_id:new ObjectID(req.query._id)},function(set){
      //查询课程列表获取对应课程名
      handler(req, res, "productList", {_id:new ObjectID(req.query.CDid)},function(data){
        if(data.length==0){
          res.end('{"err":"抱歉，视频添加失败"}');
        }else{
          //查询视频列表获取绑定课程字段Vmosaic，用以拼接

          handler(req, res, "videoList", {_id:new ObjectID(req.query.Vid),Vmosaic:{$regex:'(?!.*'+set._id+data[0]._id+'^.*$)'}},function(dat){
            //console.log({ID:parseInt(req.query.Vid),Vstate:{$regex:'(?!.*'+req.query.Did+data[0].Cname+'^.*$)'}});
            if(dat.length==0){
              res.end('{"err":"抱歉，该视频已添加"}');
            }else{
              req.query.action='update';
              var selectors;
              if(!dat[0].Vstate&&dat[0].Vmosaic){
                selectors = [
                  {"_id":new ObjectID(req.query.Vid)},
                  {$set:
                  {
                    "Vstate":data[0].Cname,
                    "Vmosaic":dat[0].Vmosaic.indexOf(set[0]._id+data[0]._id)==-1?dat[0].Vmosaic+","+set[0]._id+data[0]._id:dat[0].Vmosaic
                  }
                  }

                ];
              }else if(!dat[0].Vstate&&!dat[0].Vmosaic){
                selectors = [
                  {"_id":new ObjectID(req.query.Vid)},
                  {$set:
                  {
                    "Vstate":data[0].Cname,
                    "Vmosaic":set[0]._id+data[0]._id
                  }
                  }

                ];
              }else if(dat[0].Vstate&&!dat[0].Vmosaic){
                 selectors = [
                  {"_id":new ObjectID(req.query.Vid)},
                  {$set:
                  {
                    "Vstate":dat[0].Vstate.indexOf(data[0].Cname)==-1?dat[0].Vstate+","+data[0].Cname:dat[0].Vstate,
                    "Vmosaic":set[0]._id+data[0]._id
                  }
                  }

                ];
              }else{
                 selectors = [
                  {"_id":new ObjectID(req.query.Vid)},
                  {$set:
                  {
                    "Vstate":dat[0].Vstate.indexOf(data[0].Cname)==-1?dat[0].Vstate+","+data[0].Cname:dat[0].Vstate,
                    "Vmosaic":dat[0].Vmosaic.indexOf(set[0]._id+data[0]._id)==-1?dat[0].Vmosaic+","+set[0]._id+data[0]._id:dat[0].Vmosaic
                  }
                  }

                ];
              }
              console.log(selectors);
              //更新视频列表对应数据的Vstate字段
              handler(req, res, "videoList", selectors,function(da){
                if(da.length==0){
                  res.end('{"err":"抱歉，更新失败"}');
                }else{
                  req.query.action='find';
                  //根据目录_id与课程_id的拼接后字串查询包含此字串的视频数据并将结果集返回
                  handler(req, res, "videoList",{Vmosaic:{$regex:'.*'+set[0]._id+data[0]._id+'.*'}} ,function(da){
                    var obj = {
                      data:{
                        count:da.length,
                        list:da
                      },
                      success:"成功"
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


    //删除与课程目录绑定的对应视频
  }else if(req.query.action=='delvideo'){
    /*
     *  data: {
     courseId: GLOBAL.courseId,课程的id
     Did: GLOBAL.cataId, 目录的id
     Vid: coursewareId  视频的id
     },
     * */
    req.query.action='find';
    //查询目录列表获取对应的目录
    handler(req, res, "directoryList", {_id:new ObjectID(req.query._id)},function(set){
      //查询课程列表获取对应课程名
      handler(req, res, "productList", {_id:new ObjectID(req.query.CDid)},function(data){
        if(data.length==0){
          res.end('{"err":"抱歉，视频删除失败"}');
        }else{
          //查询视频列表获取绑定课程字段Vstate，用以拼接
          handler(req, res, "videoList", {_id:new ObjectID(req.query.Vid)},function(dat){
            if(dat.length==0){
              res.end('{"err":"抱歉，该视频已删除"}');
            }else{
              //处理Vstate
              var targetStr = data[0].Cname;
              var targetArr = dat[0].Vstate.split(",");
              var indexNumber = (function(arr,val) {
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == val) return i;
                }
                return -1;
              })(targetArr,targetStr);
              targetArr.splice(indexNumber,1);
              //处理Vmosaic
              var targetStrVmosaic = set[0]._id+data[0]._id;
              var targetArrVmosaic = dat[0].Vmosaic.split(",");
              var indexNumberVmosaic = (function(arr,val) {
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] == val) return i;
                }
                return -1;
              })(targetArrVmosaic,targetStrVmosaic);
              targetArrVmosaic.splice(indexNumberVmosaic,1);

              req.query.action='update';
              var selectors = [
                {"_id":new ObjectID(req.query.Vid)},
                {$set:
                {
                  "Vstate":targetArr.join(","),
                  "Vmosaic":targetArrVmosaic.join(",")
                }
                }

              ];
              //更新视频列表对应数据的Vstate字段
              handler(req, res, "videoList", selectors,function(da){
                if(da.length==0){
                  res.end('{"err":"抱歉，删除失败"}');
                }else{
                  res.end('{"success":"删除成功"}');

                }
              });
            }
          });

        }
      });

    });

  }else{
    res.end('{"err":"抱歉，CourseHandler下无此路由"}');
  }
});
router.post('/CourseHandler',function(req,res){

  if(req.query.action=='show'){
    var selector={};
    if(req.body.searchText){
      selector.Cname={$regex:'.*'+req.body.searchText+'.*'};
    }
    if(req.body.CategoryOne){
      selector.CategoryOne={$regex:'.*'+req.body.CategoryOne+'.*'};
    }
    if(req.body.CategoryTwo){
      selector.CategoryTwo={$regex:'.*'+req.body.CategoryTwo+'.*'};
    }
    if(req.body.CategoryThree){
      selector.CategoryThree={$regex:'.*'+req.body.CategoryThree+'.*'};
    }
    handler(req, res, "productList", null,function(arr){
      if(isNullObj(selector)){
        selector={ID:{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}};
      }
      //console.log(selector);
      handler(req, res, "productList",selector ,function(data){
          var obj = {
            data:{
              pageSize:3,
              count:arr.length,
              list:data
            }
          }
          var str = JSON.stringify(obj);
          res.end(str);

      });
    });
  }else if(req.query.action=='add'){
    req.query.action='show'
    handler(req, res, "productList", null,function(arr){
      //组织课程信息并作一些校验
      console.log("请求中的课程信息");
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
      userInfos.ID = arr.length+1;
      userInfos.upDateAt = new Date();
      userInfos.success = "添加成功";
      userInfos.isDelete = true;
      userInfos.isState = 1;
      userInfos.isTop = false;
      userInfos.onlineUser = 0;
      userInfos.Cdetails = req.body.Cdetails;
      userInfos.Cnumber = generateCode();
      req.query.action='add';
      if( userInfos.Cname&& userInfos.Cdescribe&&userInfos.Cprice>=0){
        handler(req, res, "productList",userInfos,function(data){
          if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
          }else{
            var str = JSON.stringify(data.ops[0]);
            res.end(str);
          }
        });
      }else{
        var obj = {
          data:userInfos,
          err:"抱歉，添加失败,基本信息不能为空"
        }
        var str = JSON.stringify(obj);
        res.end(str);
        //res.end('{"err":"抱歉，添加失败,基本信息不能为空"}');
      }


    });
  }else if(req.query.action=='AddDirectory'){
    //根据操作手柄查询课程列表获得相应数据的_id
    handler(req, res, "productList",{"_id":new ObjectID(req.body.CDid)},function(set){
      //获取directoryList的当前条目数
      handler(req, res, "directoryList",null,function(arr){
        var objDirectory = {
          CDName:req.body.CDName,
          CDid:req.body.CDid,
          CourseNumber:0,
          ID:arr.length+1
        }
        req.query.action = 'add';
        if( objDirectory.CDName&& objDirectory.CDid){
          //新增操作
          handler(req, res, "directoryList",objDirectory,function(data){
            if(data.ops.length==0){
              res.end('{"err":"抱歉，目录添加失败"}');
            }else{
              req.query.action = 'find';
              //根据相应课程列表的_id将directoryList列表中与其对应的目录结果集返回
              handler(req, res, "directoryList",{CDid:req.body.CDid},function(data){
                if(data.length==0){
                  res.end('{"err":"抱歉，目录添加失败"}');
                }else{
                  var obj = {
                    data:{
                      list:data,
                      success:"添加成功"
                    }
                  }
                  var str = JSON.stringify(obj);
                  res.end(str);
                }
              });
            }
          });
        }else{
          res.end('{"err":"抱歉，目录添加失败,目录信息不能为空"}');
        }
      });
    });
  //目录编辑
  }else if(req.query.action=='updateDirectory'){
    var selectors = [
      {"_id":new ObjectID(req.body._id)},
      {"$set":{
        CDName : req.body.CDName
      }
      }

    ];
    //directoryList的update操作
    handler(req, res, "directoryList", selectors,function(data){
      if(data.length==0){
        res.end('{"err":"抱歉，目录更新失败"}');
      }else{
        req.query.action = 'find';
        //根据请求参数查询课程列表相应课程的_id
        handler(req, res, "productList",{_id:new ObjectID(req.body.CDid)},function(set){

          //根据课程_id将绑定在它下面的目录结果集返回
          handler(req, res, "directoryList",{CDid:req.body.CDid},function(data){
            if(data.length==0){
              res.end('{"err":"抱歉，目录添加失败"}');
            }else{
              var obj = {
                data:{
                  list:data,
                  success:"添加成功"
                }
              }
              var str = JSON.stringify(obj);
              res.end(str);
            }
          });
        });

      }
    });
  }else if(req.query.action=='update'){
    var selectors = [
      {"_id":new ObjectID(req.body._id)},
      {"$set":{
          Cname : req.body.Cname,
          Cdescribe : req.body.Cdescribe,
          Cprice : parseInt(req.body.Cprice),
          CategoryOne : req.body.CategoryOne,
          CategoryTwo : req.body.CategoryTwo,
          CategoryThree : req.body.CategoryThree,
          Cpic : req.body.Cpic,
          upDateAt : new Date(),
          Cdetails : req.body.Cdetails
        }
      }

    ];
    console.log(selectors);
    handler(req, res, "productList", selectors,function(data){
      if(data.length==0){
        res.end('{"err":"抱歉，更新失败"}');
      }else{
        res.end('{"success":"更新成功"}');
      }
    });
  }else if(req.query.action=='state'){
    var ID = parseInt(req.body.ID);
    //查询数据库获得当前数据对应的state状态
    handler(req, res, "productList", {"ID":ID},function(data){

      if(data.length==0){
        res.end('{"err":"抱歉，处理上下架失败"}');
      }else{
        var state;
        if(data[0].isState==1){
          state=2;
        }else if(data[0].isState==2){
          state=3;
        }else{
          state=2;
        }
        var selectors = [
          {ID:ID},
          {$set:
            {
              isState : state
            }
          }

        ];
        //跟具当前状态做切换操作
        req.query.action = 'update';
        handler(req, res, "productList", selectors,function(data){
          if(data.length==0){
            res.end('{"err":"抱歉，更新失败"}');
          }else{
            res.end('{"success":"更新成功"}');
          }
        });
      }
    });
  }else if(req.query.action=='top'){
    var ID = parseInt(req.body.ID);
    //查询对应ID的document获得当前数据的isTop值
    handler(req, res, "productList", {"ID":ID},function(data){

      if(data.length==0){
        res.end('{"err":"抱歉，处理置顶失败"}');
      }else{
        var state;
        if(data[0].isTop){
          state=false;
        }else{
          state=true;
        }
        var selectors = [
          {ID:ID},
          {$set:
          {
            isTop : state
          }
          }

        ];
        //根据当前数据的isTop值做切换操作
        req.query.action = 'update';
        handler(req, res, "productList", selectors,function(data){
          if(data.length==0){
            res.end('{"err":"抱歉，更新失败"}');
          }else{
            res.end('{"success":"更新成功"}');
          }
        });
      }
    });
    //删除课程以及与其对应的目录
  }else if(req.query.action=='delete'){
    if(flagInt===0){
      req.query.action='find';
      //获取该条课程信息
      handler(req, res, "productList",{_id:new ObjectID(req.body._id)},function(set){
        if(set.length!==0){
          flagInt++;
          //迭代处理该课程对应的目录---删除目录并处理与之绑定的视频
          delProDir(req, res,set[0]._id,function(){
            req.query.action='delete';
            //删除对应ID的document
            handler(req, res, "productList",{_id:new ObjectID(req.body._id)},function(data){
              if(data.result.n==0){
                res.end('{"err":"删除失败"}');
              }else{
                req.query.action = 'find';
                //查询操作ID大于当前ID的数据集
                handler(req, res, "productList",{ID:{$gt:parseInt(req.body.ID)}},function(da){
                  //迭代处理数据集中的每条数据的ID
                  recUpdateID(req, res,"productList",da,function(){
                    flagInt--;
                    res.end('{"success":"更新成功"}');
                  });
                });
              }
            });

          });
        }else{
          res.end('{"err":"删除失败"}');
        }

      });

    }else{
      flagInt=0;
      res.end('{"state":"稍后操作"}');
    }


  }
});
//清除封面图片
router.get('/UpLoadPicHandler',function(req,res){
  if(req.query.action!=="delete"){
    var obj = {
      cacheName:'',
      err:"失败"
    }
    var str = JSON.stringify(obj);
    res.end(str);
  };
      //删除封面图片
      handler(req, res, "coverList",{pathName:req.query.pathName},function(data){

        var obj = {
          result:data,
          success:"成功"
        }
        var str = JSON.stringify(obj);
        res.end(str);
      });

});
//图片上传的处理逻辑
router.post('/UpLoadPicHandler',function(req,res){
  console.log("123456");
  console.log(req.body);
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = "temporary/";
  form.keepExtensions = true;
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.maxFields = 1000;
  //将文件暂存到项目根目录的temporary文件夹下
  form.parse(req, function(error, fields, files) {
    //生成封面图片在数据库中的索引
    var pathName = generateCode()+"pic";
   // console.log(files);
    //读取暂存文件生成16进制的流


    var readableStream = fs.createReadStream(files[Object.getOwnPropertyNames(files)[0]].path);
        var chunks = [];
        var size = 0;
        readableStream.on('data', function(chunk){
            chunks.push(chunk);
            size+= chunk.length;
         });

        readableStream.on('end', function(){
          var buf = Buffer.concat(chunks,size);
          req.query.action = 'add';
          var pictures = {
            pathName:pathName,
            contents:buf
          }
          //将图片流存入coverList变并删除暂存文件
          handler(req, res, "coverList",pictures,function(data){
            if(data.length==0){
              res.end('{"err":"抱歉，上传图片失败"}');
            }else{
              fs.unlink(files[Object.getOwnPropertyNames(files)[0]].path, function (err) {
                     if (err) return console.log(err);

                })

            }
          });
          var target = files[Object.getOwnPropertyNames(files)[0]].path.split('.');
          if(target[target.length-1]=='jpg'||target[target.length-1]=='png'||target[target.length-1]=='gif'||target[target.length-1]=='jpeg'){
            var obj = {
              cacheName:'/DownLoadPicHandler?pathName='+pathName,
              success:"成功",
              pictures:pictures
            }
            var str = JSON.stringify(obj);
            res.end(str);
          }else{
            var obj = {
              cacheName:'/DownLoadPicHandler?pathName='+pathName,
              err:"失败",
              pictures:pictures
            }
            var str = JSON.stringify(obj);
            res.end(str);
          }
        });
   

  });
});



//增加或更新数据库中的视频列表信息
router.post('/VideoHandler',function(req,res){
  if(req.query.action=='add'){
    req.query.action='find'
    handler(req, res, "videoList", null,function(arr){
      //组织视频信息并作一些校验
      var videos = {};
      videos.Vname = req.body.Vname;
      videos.Vtime = req.body.Vtime;
      videos.Vurl = req.body.Vurl;
      videos.ID = arr.length+1;
      videos.Vstate = "";
      videos.createAt = new Date();
      videos.isFinish = false;
      videos.isViewed = false;
      videos.updateAt = new Date();
      videos.Vmosaic = "";
      req.query.action='add';
      if( videos.Vname&& videos.Vtime&&videos.Vurl){
        handler(req, res, "videoList",videos,function(data){
          if(data.length==0){
            res.end('{"err":"抱歉，添加失败"}');
          }else{
            var str = JSON.stringify(data.ops[0]);

            var obj = {
              ID:parseInt(data.ops[0].ID),
              Vurl:data.ops[0].Vurl,
              success:"成功"
            }
            var str = JSON.stringify(obj);
            res.end(str);
          }
        });
      }else{
        res.end('{"err":"抱歉，视频添加失败,基本信息不能为空"}');
      }


    });
  }else if(req.query.action=='update'){
    //根据ID查询对应的视频document
    req.query.action='find'
    handler(req, res, "videoList",{ID:parseInt(req.body.ID)} ,function(data){
      if(data.length==0){
        res.end('{"err":"抱歉，系统中查不到该视频"}');
      }else{
        //如果对视频做更新操作是更改了视频源则删除原视频源
        if(data[0].Vurl!==req.body.Vurl){
          fs.unlink(data[0].Vurl, function (err) {
                    if (err) return console.log(err);
          })
        }
        var selectors = [
          {"ID":parseInt(req.body.ID)},
          {"$set":{
            Vname : req.body.Vname,
            Vtime : req.body.Vtime,
            Vurl : req.body.Vurl,
            upDateAt : new Date()
          }
          }

        ];
        //根据传入数据更新视频列表
        req.query.action='update';
        handler(req, res, "videoList", selectors,function(da){
          if(da.length==0){
            res.end('{"err":"抱歉，更新失败"}');
          }else{
            res.end('{"success":"更新成功"}');
          }
        });
      }
    });


  }else if(req.query.action=='showlist'){
    /*
    * searchText: GLOBAL.searchbox.down("#name").getValue(),
     pageStart: pageStart ? pageStart : 1
    * */
    var selector={};
    //如有模糊查询条件则以其为筛选器
    if(req.body.searchText){
      selector.Vname={$regex:'.*'+req.body.searchText+'.*'};
    }
    //查询videoList列表获得总数据条数
    handler(req, res, "videoList", null,function(arr){
      if(isNullObj(selector)){
        selector={ID:{$gt:arr.length-(parseInt(req.body.pageStart)*3-3)-3,$lte:arr.length-(parseInt(req.body.pageStart)*3-3)}};
      }
      //根据筛选器查询videoList获得结果集
      handler(req, res, "videoList",selector ,function(data){
        if(data.length==0){
          res.end('{"err":"系统中还没有视频"}');
        }else{
          var obj = {
            data:{
              pageSize:3,
              count:arr.length,
              list:data,
              pageStart:req.body.pageStart
            },
            success:"成功"
          }
          var str = JSON.stringify(obj);
          res.end(str);
        }
      });
    });

  }else{
    res.end('{"err":"抱歉，视频管理失败"}');
  }
});
router.get('/VideoHandler',function(req,res){
  //删除视频列表中的视频
  if(req.query.action=='delete'){
    req.query.action='find';
    //根据ID查询当前视频document获得当前视频的Vurl字段
    handler(req, res, "videoList",{ID:parseInt(req.query.ID)} ,function(data){
      if(data.length==0){
        res.end('{"err":"抱歉，系统中查不到该视频"}');
      }else{
          //删除系统中该视频文件
          fs.unlink(data[0].Vurl, function (err) {
            if (err) return console.log(err);
          });
        req.query.action='delete';
        //删除数据库中与该视频对应的数据
        handler(req, res, "videoList",{ID:parseInt(req.query.ID)},function(data){
          if(data.result.n==0){
            res.end('{"err":"删除失败"}');
          }else{
            req.query.action = 'find';
            //迭代处理其余视频文件的操作手柄-ID均减1
            handler(req, res, "videoList",{ID:{$gt:parseInt(req.query.ID)}},function(da){
              recUpdateID(req, res,"videoList",da);
            });
            res.end('{"success":"删除成功"}');
          }
        });

      }
    });
    //查询与课程下目录绑定的视频
  }else if(req.query.action=='finddir'){
    req.query.action='find';
    console.log(req.query._id);
    handler(req, res, "directoryList",{CDid:req.query.CDid} ,function(data){
    //handler(req, res, "directoryList",{"ID":parseInt("1")} ,function(data){
      if(data.length==0){
        var obj = {
          data:{
            list:[]
          }
          ,
          err:"未找到与该课程对应的目录"
        }
        var str = JSON.stringify(obj);
        res.end(str);
      }else{
            //console.log(data[0]._id+result[0]._id);
            var obj = {
              data:{
                list:data
              },
              success:"成功"
            }
            var str = JSON.stringify(obj);
            res.end(str);
      }
    });

  }else if(req.query.action=='showdir'){
    console.log("9999");
    console.log(req.query);
    //根据ID获取对应的目录document
    handler(req, res, "directoryList",{_id:new ObjectID(req.query._id)} ,function(data){
      console.log(data);
      if(data.length==0){
        var obj = {
          data:{
            list:[]
          }
        }
        var str = JSON.stringify(obj);
        res.end(str);
      }else{
        //根据当前目录document的CDid查询出对应的课程信息
        handler(req, res, "productList",{_id:new ObjectID(req.query.CDid)},function(result){
          //将目录与课程信息的_id字段拼接成串，根据这个查询对应的视频数据集
          var strstr = data[0]._id.toString()+data[0].CDid;
          console.log(strstr);
          handler(req, res, "videoList",{Vmosaic:{$regex:'.*'+strstr+'.*'}} ,function(da){
            //console.log(data[0]._id+result[0]._id);
              var obj = {
                data:{
                  list:da
                },
                success:"成功"
              }
              var str = JSON.stringify(obj);
              res.end(str);

          });
        });


      }
    });
  }else if(req.query.action=='show'){

    var selector={};
    if(req.query.searchText){
      selector.Vname={$regex:'.*'+req.query.searchText+'.*'};
    }
    //查询videoList获得总数据条数
    handler(req, res, "videoList", null,function(arr){
      if(isNullObj(selector)){
        selector={ID:{$gt:arr.length-(parseInt(req.query.pageStart)*req.query.pageSize-req.query.pageSize)-req.query.pageSize,$lte:arr.length-(parseInt(req.query.pageStart)*req.query.pageSize-req.query.pageSize)}};
      }
      //分页查询当前三条数据
      handler(req, res, "videoList",selector ,function(data){
        if(data.length==0){
          res.end('{"err":"抱歉，系统中还未添加任何视频"}');
        }else{
          var obj = {
            data:{
              pageSize:3,
              count:arr.length,
              list:data
            }
          }
          var str = JSON.stringify(obj);
          res.end(str);
        }
      });
    });
  }

});
//上传视频
router.post('/UpLoadVideoHandler',function(req,res){
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = "temporary/video/";
  form.keepExtensions = true;
  form.maxFieldsSize = 100 * 1024 * 1024;
  form.maxFields = 1000;
  form.parse(req, function(error, fields, files) {
    if(!error){
      var obj = {
        cacheName:files[Object.getOwnPropertyNames(files)[0]].path,
        success:"成功"
      }
      var str = JSON.stringify(obj);
      res.end(str);
    }else{
      var obj = {
        err:"上传失败"
      }
      var str = JSON.stringify(obj);
      res.end(str);
    }

  });

});



var addStudent = function(req,res){
  if(flagInt===0){
    flagInt++;
    //获取学员列表的数据总数
    handler(req, res, "studentList", null,function(arr){
      req.query.action='add'
      //组织学员信息
      var userInfos = {};
      userInfos.createAt = new Date();
      userInfos.email = req.body.email;
      userInfos.isstate = false;
      userInfos.phone =req.body.phone;
      userInfos.success = "成功";
      userInfos.tokenId = arr.length+1;
      userInfos.upDateAt = new Date();
      userInfos.userPwd = req.body.userPwd
      userInfos.userName = req.body.userName;
      handler(req, res, "studentList",userInfos,function(data){
        console.log(data);
        if(data.length==0){
          flagInt--;
          res.end('{"err":"抱歉，添加失败"}');
        }else{
          flagInt--;
          var userStudent = {};
          userStudent.name =  req.body.userName,
            userStudent.tokenId = arr.length+1,
            userStudent.userPic = "/Images/fcxyimg/upload_0fddd57a9bf66ead2416b78a38a72292.jpg",
            userStudent.email = req.body.email,
            userStudent.phone = req.body.phone,
            userStudent.nickName = ""
          var resStr = JSON.stringify({"success":"添加成功","data":userStudent});

          res.end(resStr);
        }
      });
    });
  }else{
    addStudent(req,res);
  }
}
//学员注册
router.post('/Handler/UserHandler.ashx',function(req,res){
  if(req.query.action=='add'){

    req.query.action="find";
    handler(req, res, "studentList",{userName:req.body.userName},function(da){
      if(da.length>0){
        res.end('{"err":"该用户已注册"}');
      }else{
        if(req.body.userName&& req.body.userPwd){
          addStudent(req,res);
          // flagInt++;
          // //获取学员列表的数据总数
          // handler(req, res, "studentList", null,function(arr){
          //   req.query.action='add'
          //   //组织学员信息
          //   var userInfos = {};
          //   userInfos.createAt = new Date();
          //   userInfos.email = req.body.email;
          //   userInfos.isstate = false;
          //   userInfos.phone =req.body.phone;
          //   userInfos.success = "成功";
          //   userInfos.tokenId = arr.length+1;
          //   userInfos.upDateAt = new Date();
          //   userInfos.userPwd = req.body.userPwd
          //   userInfos.userName = req.body.userName;
          //   handler(req, res, "studentList",userInfos,function(data){
          //     console.log(data);
          //     if(data.length==0){
          //       flagInt--;
          //       res.end('{"err":"抱歉，添加失败"}');
          //     }else{
          //       flagInt--;
          //       var userStudent = {};
          //       userStudent.name =  req.body.userName,
          //         userStudent.tokenId = arr.length+1,
          //         userStudent.userPic = "/Images/fcxyimg/upload_0fddd57a9bf66ead2416b78a38a72292.jpg",
          //         userStudent.email = req.body.email,
          //         userStudent.phone = req.body.phone,
          //         userStudent.nickName = ""
          //       var resStr = JSON.stringify({"success":"添加成功","data":userStudent});
          //
          //       res.end(resStr);
          //     }
          //   });
          // });
        }


      }
    });
    //客户端登录
  }else if(req.query.action=='login'){
    handler(req, res, "studentList",{userPwd:req.body.userPwd,userName:req.body.userName},function(da){
      if(da.length===0){
        res.end('{"err":"该用户未注册"}');
      }else{
        //组织学员返回信息
              var userStudent = {};
                userStudent.email = da[0].email,
                userStudent.tokenId = da[0].tokenId,
                userStudent.name =  da[0].userName,
                userStudent.userPwd = da[0].userPwd,
                userStudent.phone =da[0].phone,
                userStudent.userPic = "/Images/fcxyimg/upload_0fddd57a9bf66ead2416b78a38a72292.jpg",
                userStudent.nickName = "宝萝"
                userStudent.isdelete = false;
                userStudent.isstate = da[0].isstate;
                userStudent.createAt = da[0].createAt;
              var resStr = JSON.stringify({"success":"添加成功","data":userStudent});
              res.end(resStr);
      }
    });
    //退出登录
  }else if(req.query.action=='quit'){
    req.query.action="find"
    handler(req, res, "studentList",{userName:req.body.userName},function(da){
      if(da.length!==0 && da[0].success==="成功"){
        res.end('{"err":"该用户尚未登录"}');
      }else{
        req.query.action = 'update';
        var selectors = [
          {userName:req.body.userName},
          {$set:
            {
              success:"成功"
            }
          }

        ];
        //切换当前字段success的状态
        handler(req, res, "studentList", selectors,function(data){
          if(data){
            res.end('{"success":"该用户尚未登录"}');
          }else{
            res.end('{"err":"无法设置为未登录状态"}');
          }
        });

      }
    });
    //是否登录判断
  }else if(req.query.action==="isLogin"){
    req.query.action="find"
    handler(req, res, "studentList",{userName:req.body.userName},function(da){
      //console.log(666);
      if(da.length!=0&&da[0].success==="成功"){
        res.end('{"err":"该用户尚未登录"}');
      }else{
        res.end('{"success":"已登录"}');
      }
    });
  }

});
//返回登录学员信息/Handler/OnCourseHandler.ashx?action=mycourse
router.get('/Handler/OnCourseHandler.ashx',function(req,res){

  if(req.query.action==="returnuserinfo"){
    req.query.action="find"
    handler(req, res, "studentList",{userName:req.query.userName},function(da){
      if(da.length===0){
        res.end('{"err":"该用户尚未登录"}');
      }else{
        req.query.action = 'update';
        var selectors = [
          {userName:req.query.userName},
          {$set:
            {
              success:"已登录"
            }
          }

        ];
        //切换当前字段success的状态
        handler(req, res, "studentList", selectors,function(data){
          if(data){
            //组织学员返回信息
            var userStudent = {};
            userStudent.userName =  da[0].userName;
              userStudent.email = da[0].email;
              userStudent.phone =da[0].phone;
            var resStr = JSON.stringify(userStudent);
            res.end(resStr);
          }else{
            res.end('{"err":"无法设置为登录状态"}');
          }
        });

      }
    });
    //我的课程申请请求
  }else if(req.query.action==="mycourse"){
    req.query.action="find";
    console.log(req.query.userName+"6544444");
    if(req.query.userName){
      handler(req, res, "myProductList",{userName:req.query.userName},function(da){
        if(da.length>0){
          var sqlArr = [];
          for(var i =0;i<da.length;i++){
            if(da[i].redundancy){
              sqlArr.push(new ObjectID(da[i].productId));
            }

          }
          handler(req, res, "productList",{_id:{$in:sqlArr}},function(dat){
            if(dat.length>0){
              var listData = [];
              for(var i=0;i<dat.length;i++){
                var obj = {};
                obj.Cname=dat[i].Cname;
                obj.Cdescribe = dat[i].Cdescribe;
                obj.Cnumber = dat[i].Cnumber;
                obj.courseID = dat[i].courseID;
                obj.Cpic = dat[i].Cpic;
                obj.Cprice=dat[i].Cprice;
                obj.createAt = dat[i].createAt;
                obj.CDetails = dat[i].CDetails;
                obj.CategoryOne = dat[i].CategoryOne;
                obj.CategoryTwo = dat[i].CategoryTwo;
                obj.CategoryThree = dat[i].CategoryThree;
                obj.isDelete = dat[i].isDelete;
                obj.isState=dat[i].isState;
                obj.isTop = dat[i].isTop;
                obj.onlineUser = dat[i].onlineUser;
                obj.ID = dat[i].ID;
                listData.push(obj);
              }
              var returnObj = {
                "success": "成功",
                "data":listData
              }
              var resStr = JSON.stringify(returnObj);
              res.end(resStr);
            }else{
              res.end('{"err":"么有购买任何课程"}');
            }

          });
        }
      });
    }

  }else if(req.query.action==="mycollection"){
    req.query.action="find";
    handler(req, res, "myProductList",{userName:req.query.userName},function(da){
      if(da.length>0){
        var sqlArr = [];
        for(var i =0;i<da.length;i++){
          if(da[i].redundancy&&da[i].isEnshrine){
            sqlArr.push(new ObjectID(da[i].productId));
          }

        }
        handler(req, res, "productList",{_id:{$in:sqlArr}},function(dat){
          if(dat.length>0){
            var listData = [];
            for(var i=0;i<dat.length;i++){
              var obj = {};
              obj.Cname=dat[i].Cname;
              obj.Cdescribe = dat[i].Cdescribe;
              obj.Cnumber = dat[i].Cnumber;
              obj.courseID = dat[i].courseID;
              obj.Cpic = dat[i].Cpic;
              obj.Cprice=dat[i].Cprice;
              obj.createAt = dat[i].createAt;
              obj.CDetails = dat[i].CDetails;
              obj.CategoryOne = dat[i].CategoryOne;
              obj.CategoryTwo = dat[i].CategoryTwo;
              obj.CategoryThree = dat[i].CategoryThree;
              obj.isDelete = dat[i].isDelete;
              obj.isState=dat[i].isState;
              obj.isTop = dat[i].isTop;
              obj.onlineUser = dat[i].onlineUser;
              obj.ID = dat[i].ID;
              listData.push(obj);
            }
            var returnObj = {
              "success": "成功",
              "data":listData
            }
            var resStr = JSON.stringify(returnObj);
            res.end(resStr);
          }else{
            res.end('{"err":"么有购买任何课程"}');
          }

        });
      }else{
        res.end('{"err":"么有购买任何课程"}');
      }
    });
  }
});
//已登录情况下的课程数据请求
router.post('/Handler/OnCourseHandler.ashx',function(req,res){
  if(req.query.action==="learnshow"){
    req.query.action = "find";
    //根据课程ID获取对应课程信息
    handler(req, res, "productList", {"ID":parseInt(req.body.courseId)}, function (da) {
      //根据课程_id获得该课程绑定的视频
      handler(req, res, "videoList", { Vmosaic: { $regex: '.*'+da[0]._id.toString()+'.*' } }, function (dat) {
          //根据用户名查看myProductList列表获取购买与收藏信息
          handler(req, res, "myProductList", {userName: req.body.userName,productId:da[0]._id.toString()}, function (data) {
            console.log(data);
            //根据课程_id查询commentList表获取评论信息
            handler(req, res, "commentList", { courseID: da[0]._id.toString() }, function (data1) {
             // console.log(data1);
              var listData = [];
              for(var i=0;i<data1.length;i++){
                var obj = {};
                obj.UserId=data1[i].UserId;
                obj.createAt = data1[i].createAt;
                obj.evaluate = data1[i].evaluate;
                obj.courseID = data1[i].courseID;
                obj.ID = data1[i]._id.toString();
                listData.push(obj);
              }
              var returnObj = {
                "success": data.lenght>0?"已登录":"未登录",
                "data": {
                  "Cname": da[0].Cname,
                  "Id": da[0]._id.toString(),
                  "Cdescribe":da[0].Cdescribe,
                  "Cpic": da[0].Cpic,
                  "Cprice":da[0].Cprice,
                  "CDetails":da[0].CDetails,
                  "Cnumber":da[0].Cnumber,
                  "createAt":da[0].createAt,
                  "CategoryOne":da[0].CategoryOne,
                  "CategoryTwo":da[0].CategoryTwo,
                  "CategoryThree":da[0].CategoryThree,
                  "ifColected":data.length?data[0].isEnshrine:"",
                  "ifPay":data.length?data[0].redundancy:"",
                  "isDelete":da[0].isDelete,
                  "isState":da[0].isState,
                  "isTop":da[0].isTop,
                  "upDateAt":da[0].upDateAt,
                  "onlineUser":da[0].onlineUser,
                  "CDlist":[{
                      "CDname":"",
                      "Vlist":[{
                         "Vname":dat.length>0?dat[0].Vname:'',
                         "ID"	:dat.length>0?dat[0]._id.toString():'',
                         "Vtime":dat.length>0?dat[0].Vtime:'',
                         "Vurl":dat.length>0?dat[0].Vurl:'',
                         "createAt":dat.length>0?dat[0].createAt:'',
                         "isViewing":"",
                         "isViewed":false,
                         "isFinish":false
                      }]
                  }],
                  "evaluate":{
                    "pageStart":1,
                    "pageSize":5,
                    "count":30,
                    "list":listData
                  }
                }
              }
              var resStr = JSON.stringify(returnObj);
              res.end(resStr);

            });

          });
      });




    });
  //收藏
  }else if(req.query.action==="collection"){
    req.query.action="find";
    //根据ID查询课程procuctList列表获取课程信息
    handler(req, res, "productList", {"ID":parseInt(req.body.courseId)}, function (da) {
      //根据课程_id与用户名查询myProductList列表
      handler(req, res, "myProductList", {"$and":[{userName: req.body.userName},{productId:da[0]._id.toString()}]  }, function (dat) {
        console.log(dat);
        if(dat.length>0){
          req.query.action = "update";
          var selectors;
          if(dat[0].isEnshrine){
            selectors = [
              {"_id":new ObjectID(dat[0]._id.toString())},
              {$set:
                {
                  isEnshrine:false
                }
              }

            ];
          }else{
            selectors = [
              {"_id":new ObjectID(dat[0]._id.toString())},
              {$set:
                {
                  isEnshrine:true
                }
              }

            ];
          }
          handler(req, res, "myProductList",selectors , function (data) {

            if(dat[0].isEnshrine){
              var returnObj = {
                  "success":"取消收藏成功",
                  "ifColected":false
                }
                var resStr = JSON.stringify(returnObj);
                res.end(resStr);
            }else{
              var returnObj = {
                "success":"收藏成功",
                "ifColected":true
              }
              var resStr = JSON.stringify(returnObj);
              res.end(resStr);
            }
            // var returnObj = {
            //   "success":"成功",
            //   "ifPay":true
            // }
            // var resStr = JSON.stringify(returnObj);
            // res.end(resStr);


          })

        }
      });
    })

  }else if(req.query.action==="buy"){
    req.query.action = "find";
    if(req.body.userName){
      //根据ID查询课程procuctList列表获取课程信息
      handler(req, res, "productList", {"ID":parseInt(req.body.courseId)}, function (da) {
        //根据课程_id与用户名查询myProductList列表
        handler(req, res, "myProductList", {userName: req.body.userName,productId:da[0]._id.toString() }, function (dat) {

          if(dat.length>0){
            req.query.action = "update";
            var selectors;
            selectors = [
              {"productId":da[0]._id.toString()},
              {$set:
                {
                  redundancy:true
                }
              }

            ];


            handler(req, res, "myProductList",selectors , function (data) {
              var returnObj = {
                "success":"成功",
                "ifPay":true
              }
              var resStr = JSON.stringify(returnObj);
              res.end(resStr);


            })

          }else{
            req.query.action = "add";
            var addObject = {};
            addObject.productId=da[0]._id.toString();
            addObject.userName = req.body.userName;
            addObject.isEnshrine = false;
            addObject.redundancy = true;
            handler(req, res, "myProductList",addObject , function (data1) {
              var returnObj = {
                "success":"成功",
                "ifPay":true
              }
              var resStr = JSON.stringify(returnObj);
              res.end(resStr);
            })
          }
        });
      })
    }
    // else{
    //   var returnObj = {
    //     "err":"失败"
    //   }
    //   var resStr = JSON.stringify(returnObj);
    //   res.end(resStr);
    // }

    //增加评价
  }else if(req.query.action==="addcoursecomments"){
    req.query.action = "find";
    //根据ID查询课程procuctList列表获取课程信息
    handler(req, res, "productList", {"ID":parseInt(req.body.courseId)}, function (da) {
      req.query.action = "add";
      var addObject = {};
      addObject.UserId=req.body.userName;
      addObject.createAt = new Date();
      addObject.evaluate = req.body.evaluate;
      addObject.courseID = da[0]._id.toString();
      handler(req, res, "commentList",addObject , function (data1) {
        var returnObj = {
          "success":"成功"
        }
        var resStr = JSON.stringify(returnObj);
        res.end(resStr);
      })
    })

  }else if(req.query.action==="deletecollection"){
    req.query.action = "find";
    //根据ID查询课程procuctList列表获取课程信息
    handler(req, res, "productList", {"ID":parseInt(req.body.courseId)}, function (da) {
      req.query.action = "update";
        //根据课程_id更改myProductList列表字段productId对应的数据
      var selectors = [
        {"productId":da[0]._id.toString()},
        {$set:
          {
            isEnshrine:false
          }
        }

      ];
      handler(req, res, "myProductList", selectors, function (dat) {
        var returnObj = {
          "success":"成功"
        }
        var resStr = JSON.stringify(returnObj);
        res.end(resStr);
      });
    })
  }
});
//首页课程数据获取
router.post('/Handler/OfflineCourseHandler.ashx',function(req,res) {
  if (req.query.action === "indexshow") {
    req.query.action = "find";
    console.log('你好啊')
    handler(req, res, "productList", null, function (arr) {
        //组织首页信息
        var returJson = {};
        returJson.bannerList = [];
        returJson.goodList = [];
        returJson.newList = [];
        returJson.chooseList = [];
        for (var i = 0; i < arr.length; i++) {
          returJson.chooseList[i] = {}
          returJson.chooseList[i].Cname = arr[i].Cname;
          returJson.chooseList[i].Cdescribe = arr[i].Cdescribe;
          returJson.chooseList[i].Cnumber = arr[i].Cnumber;
          returJson.chooseList[i].Cpic = arr[i].Cpic;
          returJson.chooseList[i].Cprice = arr[i].Cprice;
          returJson.chooseList[i].createAt = arr[i].createAt;
          returJson.chooseList[i].CDetails = arr[i].CDetails;
          returJson.chooseList[i].CategoryOne = arr[i].CategoryOne;
          returJson.chooseList[i].CategoryTwo = arr[i].CategoryTwo;
          returJson.chooseList[i].CategoryThree = arr[i].CategoryThree;
          returJson.chooseList[i].isDelete = arr[i].isDelete;
          returJson.chooseList[i].isState = arr[i].isState;
          returJson.chooseList[i].isTop = arr[i].isTop;
          returJson.chooseList[i].onlineUser = arr[i].onlineUser;
          returJson.chooseList[i].upDateAt = arr[i].upDateAt;
          returJson.chooseList[i].ID = arr[i].ID;
          if (i <= 3) {
            returJson.bannerList[i] = {}
            returJson.bannerList[i].Cname = arr[i].Cname;
            returJson.bannerList[i].Cdescribe = arr[i].Cdescribe;
            returJson.bannerList[i].Cnumber = arr[i].Cnumber;
            returJson.bannerList[i].Cpic = arr[i].Cpic;
            returJson.bannerList[i].Cprice = arr[i].Cprice;
            returJson.bannerList[i].createAt = arr[i].createAt;
            returJson.bannerList[i].CDetails = arr[i].CDetails;
            returJson.bannerList[i].CategoryOne = arr[i].CategoryOne;
            returJson.bannerList[i].CategoryTwo = arr[i].CategoryTwo;
            returJson.bannerList[i].CategoryThree = arr[i].CategoryThree;
            returJson.bannerList[i].isDelete = arr[i].isDelete;
            returJson.bannerList[i].isState = arr[i].isState;
            returJson.bannerList[i].isTop = arr[i].isTop;
            returJson.bannerList[i].onlineUser = arr[i].onlineUser;
            returJson.bannerList[i].upDateAt = arr[i].upDateAt;
            returJson.bannerList[i].ID = arr[i].ID;
            returJson.goodList[i] = {}
            returJson.goodList[i].Cname = arr[i].Cname;
            returJson.goodList[i].Cdescribe = arr[i].Cdescribe;
            returJson.goodList[i].Cnumber = arr[i].Cnumber;
            returJson.goodList[i].Cpic = arr[i].Cpic;
            returJson.goodList[i].Cprice = arr[i].Cprice;
            returJson.goodList[i].createAt = arr[i].createAt;
            returJson.goodList[i].CDetails = arr[i].CDetails;
            returJson.goodList[i].CategoryOne = arr[i].CategoryOne;
            returJson.goodList[i].CategoryTwo = arr[i].CategoryTwo;
            returJson.goodList[i].CategoryThree = arr[i].CategoryThree;
            returJson.goodList[i].isDelete = arr[i].isDelete;
            returJson.goodList[i].isState = arr[i].isState;
            returJson.goodList[i].isTop = arr[i].isTop;
            returJson.goodList[i].onlineUser = arr[i].onlineUser;
            returJson.goodList[i].upDateAt = arr[i].upDateAt;
            returJson.goodList[i].ID = arr[i].ID;
            returJson.newList[i] = {}
            returJson.newList[i].Cname = arr[i].Cname;
            returJson.newList[i].Cdescribe = arr[i].Cdescribe;
            returJson.newList[i].Cnumber = arr[i].Cnumber;
            returJson.newList[i].Cpic = arr[i].Cpic;
            returJson.newList[i].Cprice = arr[i].Cprice;
            returJson.newList[i].createAt = arr[i].createAt;
            returJson.newList[i].CDetails = arr[i].CDetails;
            returJson.newList[i].CategoryOne = arr[i].CategoryOne;
            returJson.newList[i].CategoryTwo = arr[i].CategoryTwo;
            returJson.newList[i].CategoryThree = arr[i].CategoryThree;
            returJson.newList[i].isDelete = arr[i].isDelete;
            returJson.newList[i].isState = arr[i].isState;
            returJson.newList[i].isTop = arr[i].isTop;
            returJson.newList[i].onlineUser = arr[i].onlineUser;
            returJson.newList[i].upDateAt = arr[i].upDateAt;
            returJson.newList[i].ID = arr[i].ID;

          }
        }
        var returnObj = {
          "success": "成功",
          "data": returJson
        }
        var resStr = JSON.stringify(returnObj);
        res.end(resStr);
      }
    );
    //获取课程列表
  } else if (req.query.action === "courseshow") {
    req.query.action = "find";
    var selectorObj = {};
    req.body.searchText?selectorObj.Cname={ $regex: '.*'+req.body.searchText+'.*' }:'';
    if(req.body.CategoryTwo&&req.body.CategoryTwo!='全部'){
      selectorObj.CategoryOne= req.body.CategoryTwo
    }
    if(parseInt(req.body.CpriceId)===1){
      selectorObj.Cprice=0

    }else if(parseInt(req.body.CpriceId)===2){
      selectorObj.Cprice={$gt:0}
    }
    //req.body.CpriceId?selectorObj.CpriceId=parseInt(req.body.CpriceId):'';
    console.log(selectorObj);
    handler(req, res, "productList", selectorObj, function (arr) {
      var i = 0;
      i=(parseInt(req.body.pageStart)-1)*3
      //组织首页信息
      var returJson = {};
      returJson.bannerList = [];
      for (var i = 0; i < arr.length; i++) {
        if (i <= 20) {
          returJson.bannerList[i] = {}
          returJson.bannerList[i].Cname = arr[i].Cname;
          returJson.bannerList[i].Cdescribe = arr[i].Cdescribe;
          returJson.bannerList[i].Cnumber = arr[i].Cnumber;
          returJson.bannerList[i].Cpic = arr[i].Cpic;
          returJson.bannerList[i].Cprice = arr[i].Cprice;
          returJson.bannerList[i].createAt = arr[i].createAt;
          returJson.bannerList[i].CDetails = arr[i].CDetails;
          returJson.bannerList[i].CategoryOne = arr[i].CategoryOne;
          returJson.bannerList[i].CategoryTwo = arr[i].CategoryTwo;
          returJson.bannerList[i].CategoryThree = arr[i].CategoryThree;
          returJson.bannerList[i].isDelete = arr[i].isDelete;
          returJson.bannerList[i].isState = arr[i].isState;
          returJson.bannerList[i].isTop = arr[i].isTop;
          returJson.bannerList[i].onlineUser = arr[i].onlineUser;
          returJson.bannerList[i].upDateAt = arr[i].upDateAt;
          returJson.bannerList[i].ID = arr[i].ID;
        }
      }
      /*
       * pageStart
       pageSize
       count
       list
       * */
      var returnObj = {
        "success": "成功",
        "data": {
          "pageStart": parseInt(req.body.pageStart),
          "pageSize": 3,
          "count": arr.length,
          "list": returJson.bannerList
        }
      }
      var resStr = JSON.stringify(returnObj);
      res.end(resStr);


    });
  }else if(req.query.action==="learnshow"){

    req.query.action = "find";
    //根据课程ID获取对应课程信息
    handler(req, res, "productList", {"ID":parseInt(req.body.courseId)}, function (da) {
      //根据课程_id获得该课程绑定的视频
      handler(req, res, "videoList", { Vmosaic: { $regex: '.*'+da[0]._id.toString()+'.*' } }, function (dat) {
        //根据用户名查看myProductList列表获取购买与收藏信息
        handler(req, res, "myProductList", {"$and":[{userName: req.body.userName},{productId:da[0]._id.toString()}]  }, function (data) {
          //根据课程_id查询commentList表获取评论信息
          handler(req, res, "commentList", { courseID: da[0]._id.toString() }, function (data1) {
            // console.log(data1);
            var listData = [];
            for(var i=0;i<data1.length;i++){
              var obj = {};
              obj.UserId=data1[i].UserId;
              obj.createAt = data1[i].createAt;
              obj.evaluate = data1[i].evaluate;
              obj.courseID = data1[i].courseID;
              obj.ID = data1[i]._id.toString();
              listData.push(obj);
            }
            var returnObj = {
              "success": "成功",
              "data": {
                "Cname": da[0].Cname,
                "Id": da[0]._id.toString(),
                "Cdescribe":da[0].Cdescribe,
                "Cpic": da[0].Cpic,
                "Cprice":da[0].Cprice,
                "CDetails":da[0].CDetails,
                "Cnumber":da[0].Cnumber,
                "createAt":da[0].createAt,
                "CategoryOne":da[0].CategoryOne,
                "CategoryTwo":da[0].CategoryTwo,
                "CategoryThree":da[0].CategoryThree,
                "ifColected":data.length?data[0].isEnshrine:"",
                "ifPay":data.length?data[0].redundancy:"",
                "isDelete":da[0].isDelete,
                "isState":da[0].isState,
                "isTop":da[0].isTop,
                "upDateAt":da[0].upDateAt,
                "onlineUser":da[0].onlineUser,
                "CDlist":[{
                  "CDname":"",
                  "Vlist":[{
                    "Vname":dat.length>0?dat[0].Vname:'',
                    "ID"	:dat.length>0?dat[0]._id.toString():'',
                    "Vtime":dat.length>0?dat[0].Vtime:'',
                    "Vurl":dat.length>0?dat[0].Vurl:'',
                    "createAt":dat.length>0?dat[0].createAt:'',
                    "isViewing":"",
                    "isViewed":false,
                    "isFinish":false
                  }]
                }],
                "evaluate":{
                  "pageStart":1,
                  "pageSize":5,
                  "count":30,
                  "list":listData
                }
              }
            }
            var resStr = JSON.stringify(returnObj);
            res.end(resStr);

          });
      });



      });
    });
    //获取课程列表页面中课程列表下拉框
  }else if(req.query.action=="getcategory"){
    req.query.action = "find";
    handler(req, res, "catalogList", {"fatherId":0}, function (da) {
      var listData = [];
      for(var i=0;i<da.length;i++){
        var obj = {};
        obj.sysId=i+1;
        obj.title = da[i].title;
        listData.push(obj);
      }
      var returnObj = {
        "success": "成功",
        "data": listData
      }
      var resStr = JSON.stringify(returnObj);
      res.end(resStr);

    });
  }
});


module.exports = router;
