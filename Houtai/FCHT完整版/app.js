// 加载express框架
var express = require('express');
//  加在path 模块 处理路径的一个模块
var path = require('path');
//  处理日志   打印访问的日志
var logger = require('morgan');
// 处理cookie的
var cookieParser = require('cookie-parser');
//  设置cookie的模块
var flash = require('connect-flash');
// 设置 session的模块
var session = require('express-session');
//  处理post的中件间
var bodyParser = require('body-parser');
// 加载路由   我们处理 他
var index = require('./routes/handler');
// 加载处理数据的模块
var handler = require('./routes/dbhandler')

// 入口函数
var app = express();



// 解决用ajax   跨域和调取数据后在控制台显示乱码的问题
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("content-type", "text/html;charset=utf-8");
    next();
});
/* 使用前面加载的中间件 */
// 使用日志的中间件
app.use(logger('dev'));

// 使用 bodyParser  处理post 请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//  使用 处理cookie的中间件
app.use(cookieParser());
//  使用 设置cookie 的flash包
app.use(flash());


// 设置session
app.use(session({
    "name": "FCXYHT",// 设置cookie的名称，他有个默认的 connect.sid
    "secret": "FCXYHT",// 设置加密的字符串，它是一个必须的属性
    "cookie": {maxAge: 8000000000},//设置cookie的失效时间
    "resave": false,// 每次请求是否新设置session
    "saveUninitialized": false//每次请求是否初始化
}));
// 静态资源托管的中间件
app.use(express.static(path.join(__dirname, 'public')));
// 加载路由
app.use('/VueHandler', index);

//特殊图片请求，不由express的静态服务管理
app.get('/DownLoadPicHandler', function (req, res) {
    var arr = request.originalUrl.split("=");
    handler("find", "coverList", {pathName: arr[arr.length - 1]}, function (docs) {
        if (!docs[0]) {
            response.end('{"err":"抱歉，图片请求失败"}');
        } else {
            req.send(docs[0].contents.buffer);
        }
    })
});
module.exports = app;
