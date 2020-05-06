title: vue中axios如何实现token验证
继上篇实现Auth认证之后,然后每个跳转页面都会在后端验证token的存在 然后那天晚上通过模仿Auth发送请求,发送成功(上篇末尾的方式) 但是今天再继续写,发现每个页面请求都要发送token验证 就比较麻烦了

这时候又要axios上场了 可以通过axios类似error拦截的方式拦截http request请求 这样每次request都可以默认加上token (当然前提已经在session里存储了你的token验证字符串)

// main.js文件
// http request 拦截器
axios.interceptors.request.use(
  config => {
    var token = sessionStorage.getItem('token');
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      token =sessionStorage.getItem('token')+':';
      config.headers.Authorization = `Basic ${new Buffer(token).toString('base64')}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
复制代码
为什么要加":"? 这里一开始我并没有加冒号,然后发现新加的request页面显示401 但是消息头里明明加上了Authorization,细看的话发现这个token和另外几个页面的不同 (因为另外几个页面的token是那天晚上的方式通过axios直接发送的) 解码正确的token发现是缺少冒号,具体原因不是很清楚 查看文档似乎发现了一个合理的解释(不知道是否正确) 文档中写到:

新版的 verify_password 回调函数会尝试认证两次。首先它会把 username 参数作为令牌进行认证。如果没有验证通过的话，就会像基于密码认证的一样,验证username和password 然后文档curl例子类似下面的格式

$ curl -u eyJhbGciOiJIUzI1NiIsImV4cCI6MTM4NTY2OTY1NSwiaWF0IjoxMzg1NjY5MDU1fQ.eyJpZCI6MX0.XbOEFJkhjHJ5uRINh2JA1BPzXjSohKYDRT472wGOvjc:unused -i -X GET http://127.0.0.1:5000/api/resource
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 30
Server: Werkzeug/0.9.4 Python/2.7.3
Date: Thu, 28 Nov 2013 20:05:08 GMT

{
  "data": "Hello, miguel!"
}
复制代码
我们会看到这个 token:unused 的格式 然后request时会加上冒号