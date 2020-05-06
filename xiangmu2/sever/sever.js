var express = require("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var fileJson = "./data.json";




var postparse=bodyParser.urlencoded({extended:false});//1
var multer = require("multer");
var jwt = require("jsonwebtoken");
var jwtStr="kky";
var tokenArr=[];




var dataJson="./data/data.json";
var userJson="./data/user.json";

//跨域
//跨域问题(cors)
app.use("*", function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});
// app.use("*", function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header("Access-Control-Allow-Methods", "*");
// 	res.header("Access-Control-Allow-Headers", "content-type");
// 	next();
// });


//静态资源
//app.use(express.static("./public/jquery"));
//app.use(express.static("./public/css"));
app.use(express.static("./img"));
app.use(express.static("./public/upload"));


app.use(multer({ dest: './tmp/'}).array("myFile"));


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
	extended: false
}); 


//主页
app.get("/", function (req, res) {
	//console.log("__dirname:",__dirname);
	res.send("这是主页");
	//res.sendFile(__dirname+"/"+filePage);//
});


//a2: addGet
app.get("/addGet", function (req, res) {
	var obj = req.query;
	console.log("addGet obj:", obj);
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			obj.id = new Date().getTime() + "";
			arr.unshift(obj);
			var str2 = JSON.stringify(arr);
			fs.writeFile(fileJson, str2, function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})
});


//a4: addPost
app.post("/addPost", bodyParser.json(), function (req, res) {
	var obj = req.body;
	console.log("addPost obj:", obj);
	// res.send({s:0});
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 1
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			obj.id = new Date().getTime() + "";
			arr.unshift(obj);
			var str2 = JSON.stringify(arr);
			fs.writeFile(fileJson, str2, function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})
});




//a6
app.get("/getData", function (req, res) {
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 3
			});
		} else {
			var obj = {
				s: 0,
				data: data.toString()
			};
			console.log(data)
			res.send(obj);
		}
	})
	// res.sendFile(__dirname+'/product.json')
})


app.get("/menu", function (req, res) {
	fs.readFile('./data/conFig.json', function (err, data) {
		if (err) {
			res.send({
				err: 3
			});
		} else {
			var obj = {
				s: 0,
				data: data.toString()
			}
			setTimeout(function () {
				res.send(obj);
			}, 1000);
		}
	})
})


app.post("/del/:id", urlencodedParser, function (req, res) {
	const id = req.params.id;
	console.log(id);
	fs.readFile(fileJson, function (err, data) {
		if (err) {
			res.send({
				err: 3
			});
		} else {
			var str = data.toString();
			var arr = JSON.parse(str);
			let resultArr = arr.filter((item, i) => {
				return item.id !== id
			})


			fs.writeFile(fileJson, JSON.stringify(resultArr), function (err) {
				if (err) {
					res.send({
						s: 2
					})
				} else {
					res.send({
						s: 0
					})
				}
			})
		}
	})
});




app.post("/upload",(req,res)=>{
	var obj=req.body;
	var file=req.files[0];
	console.log("upload obj:",obj);
	console.log("upload file:",file);
	var id=new Date().getTime();
	var imgName=id+"_"+file.originalname;
	var uploadFile="./public/upload/"+imgName;
	console.log('mimetype:',file.mimetype);
	fs.readFile(file.path,(err,data)=>{
		if(err){
			
		}else{
			fs.writeFile(uploadFile,data,err=>{
				if(err){
					
				}else{
					res.send({success:0});
					fs.unlink(file.path,err=>{
						if(err){
							
						}else{
							console.log("删除临时文件成功");
						}
					})
				}
			})
		}
	})
})






//启动app
app.listen(85, function () {
	console.log("OK 85");
});