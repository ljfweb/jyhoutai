var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser")


var filejson = './data/data.json'
var fenleijson = './data/fenlei.json'
var userjson = './data/user.json'
var emailjson = './data/email.json'


var jwt = require("jsonwebtoken");
var jwtStr = "kky";
var tokenArr = [];
let secret = "kisskillyou";

//跨域
//跨域问题(cors)
app.use("*", function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});
//app.use("*", function(req, res, next) {
//	res.header('Access-Control-Allow-Origin', '*');
//	res.header("Access-Control-Allow-Methods", "*");-
//	res.header("Access-Control-Allow-Headers", "content-type");
//	next();
//});

app.get("/",(req,res)=>{
	res.send("这是后台")
})

app.get("/getData",(req,res)=>{
    //读文件 filejson
	fs.readFile(filejson,(err,data)=>{
        if(err){
            res.send({//失败返回
                err:3
            })
        }else{ //成功返回
            var obj = {
                s : 0,
                data: data.toString() //将json串转换成字符串
            };
        }
        // console.log(data)
        res.send(obj)
    })
})

//查找接口
app.post("/upData", bodyParser.json(), function (req, res) {
	const id = req.body;
	console.log(id);
	 	fs.readFile(filejson,(err,data)=>{
			 if(err){
				 res.send({
					 err:3
				 })
			 }else{
				if (id.id<=2) {
					let arr = Object.values(JSON.parse(data.toString()))
					let str = arr[0].filter(item=>item.id == id.id)
					res.send(str)
				} 
				if (id.id>2&&id.id<19) {
					let arr = Object.values(JSON.parse(data.toString()))
					// console.log(arr[1])
					let str = arr[1][0].product.filter(item=>item.id == id.id)
					// let str = arr[1]
					// console.log(str)
					res.send(str)
				} 
				if (id.id>=18&&id.id<=20) {
					let arr = Object.values(JSON.parse(data.toString()))
					// console.log(arr[1])
					let str = arr[1][1].product.filter(item=>item.id == id.id)
					// let str = arr[1]
					// console.log("000000",arr[1][1].product)
					res.send(str)
				} 
				if (id.id>=21&&id.id<=37) {
					let arr = Object.values(JSON.parse(data.toString()))
					// console.log(arr[1])
					let str = arr[1][2].product.filter(item=>item.id == id.id)
					// let str = arr[1]
					// console.log("000000",arr[1][1].product)
					res.send(str)
				} 
			 }
		 })
});


//注册-添加用户-手机号注册
app.post("/addPostObjUser", bodyParser.json(), (req, res) => {
	var obj = req.body;
	fs.readFile(userjson, (err, data) => {
		if (err) {//判断注册成功返回
			res.send({
				err: 1
			})
		} else {
			//将传过来的字符串转换成数组用变量arr接收
			var arr = JSON.parse(data.toString());
			//循环arr
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].phone == obj.phone) {//判断刚注册的手机号是否注册过
					res.send({                  //注册过返回msg:"该手机号已注册"
						err: 2,      
						msg:"该手机号已注册"
					})
					return; //跳出函数
				}
			}
			obj.id = new Date().getTime();//id
			arr.push(obj);//将id添加到数组arr中
			let str = JSON.stringify(arr);//再将数组arr转换成字符串用变量str接收
			fs.writeFile(userjson, str, err => {
				if (err) {
					res.send({
						err: 3
					})
				} else {
					res.send({ //向前台返回数据
						success: 1
					})
				}
			})
		}
	})
})

//注册-添加用户-邮箱注册
app.post("/addPostObjEmail", bodyParser.json(), (req, res) => {
	var obj = req.body;
	fs.readFile(emailjson, (err, data) => {
		if (err) {
			res.send({
				err: 1
			})
		} else {
			var arr = JSON.parse(data.toString());
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].email == obj.email) {
					res.send({
						err: 2,
						msg:"邮箱已存在"
					})
					return;
				}
			}
			obj.id = new Date().getTime();
			arr.push(obj);
			let str = JSON.stringify(arr);
			fs.writeFile(emailjson, str, err => {
				if (err) {
					res.send({
						err: 3
					})
				} else {
					res.send({
						success: 1
					})
				}
			})
		}
	})
})





//登录
app.post("/postLogin", bodyParser.json(), (req, res) => {
	var obj = req.body;
	fs.readFile(userjson, (err, data) => {
		if (err) {
			res.send({
				err: 1
			})
		} else {
			let arr = JSON.parse(data.toString());
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].phone == obj.phone && arr[i].pwd == obj.pwd) {
					let token = jwt.sign(obj, secret, {
						expiresIn: 60 * 60
					});
					//签发token
					res.send({
						token: token,
						id: arr[i].id,
						success:0
					})
					return;
				}
			}
			res.send({
				err: 2
			});
		}
	})
})


app.post("/getCatetary", bodyParser.json(), function (req, res) {
	const id = req.body;
	console.log(id);
	 	fs.readFile(filejson,(err,data)=>{
			 if(err){
				 res.send({
					 err:3
				 })
			 }else{
				
					// let arr = Object.values(JSON.parse(data.toString()))
					// let str = arr[0].filter(item=>item.id == id.id)
					res.send(data)
				
			 }
		 })
});








// app.get("/getDataUser",(req,res)=>{
// 	console.log("getDataUser");
// 	setTimeout(()=>{
// 		res.sendFile(__dirname+"/"+userjson);
// },1500);
// })

// app.post("/addPost",bodyParser.json(),(req,res)=>{
// 	var obj=req.body;
// 	// console.log("/addPost obj:",obj);
// 	fs.readFile(userjson,(err,data)=>{
// 		if(err){
// 			console.log("3err:",err);
// 			res.send({error:3});
// 		}else{
// 			var arr=JSON.parse(data.toString());
// 			obj.id=new Date().getTime()+"";
// 			arr.unshift(obj);
// 			var str=JSON.stringify(arr);
// 			fs.writeFile(userJson,str,err=>{
// 				if(err){
// 					console.log("4err",err);
// 					res.send({error:4});
// 				}else{
// 					res.send({success:0});
// 				}
// 			})
// 		}
// 	})
// });


//登录接口
// app.post("/login",bodyParser.json(),(req,res)=>{
// 	let obj=req.body;
// 	console.log("obj:",obj);
// 	if(obj.phone=="admin"&&obj.pwd=="kky"){
// 		let token=jwt.sign(obj,jwtStr,{expiresIn:60});
// 		let ob={
// 			token,
// 			phone:obj.phon
// 		}
// 		tokenArr.push(ob);
// 		res.send({...ob,success:0});
// 	}else{
// 		res.send({err:1});
// 	}
// })


app.listen(83,()=>{
	console.log("http://127.0.0.0:83")
})
