/*
 * nodejs操作mongodb数据的基本代码
 * 1. 加载mongodb
 * 2. 创建mongodb客户端
 * 3. 链接本机的mongodb数据库===》对数据库的链接
 *
 * */
// 加载mongodb
var mongo = require('mongodb')
// 创建mongodb 的客户端
var MongoClient = mongo.MongoClient
// 本机mongdb数据库的地址
var urls = 'mongodb://127.0.0.1:27017/administor'
// 查询的方法
// 参数  db  ==》对数据库的链接  ---> 释放对数据库的链接
//      collection  ===>对集合的链接  -->在集合上操作查询
//      selector  ===》查询的条件
//      callback  ==》查询后回调  -->处理查询后的结果
// 查询
var find = function(db, collection, selector, callback) {
  collection.find(selector).toArray(function(err, result) {
    if (err) {
      console.log('查询失败')
      console.log(err)
    } else {
      callback(result)
    }
    db.close() // 释放链接
  })
}
// 删除
var deletes = function(db, collection, selector, callback) {
  collection.deleteOne(selector, function(err, result) {
    if (err) {
      console.log('删除失败')
      console.log(err)
    } else {
      callback(result)
    }
    db.close()
  })
}
// 添加
var add = function(db, collection, selector, callback) {
  collection.insert(selector, function(err, result) {
    if (err) {
      // 操作失败
      console.log('写入数据失败')
      console.log(err)
    } else {
      // 操作成功
      callback(result)
    }
    db.close() //释放链接
  })
}
// 修改  操作数据 selector ==》 修改的条件和修改的内容
//             selector ===》 数组  [{修改的条件}，{修改的内容}]
var updates = function(db, collection, selector, callback) {
  //                    更新条件    更新的内容    更新后的回调
  collection.updateOne(selector[0], selector[1], function(err, result) {
    if (err) {
      console.log('更新失败')
      console.log(err)
    } else {
      callback(result)
    }
    db.close() //释放链接
  })
}

// 方法类别
var methodType = {
  find: find,
  add: add,
  deletes: deletes,
  updates: updates,
  update: updates,
  delete: deletes
}
//
/*   请求对象  响应对象  集合的名称  操作的数据 回调函数  */
//    method ==》 字符串   “find”  ==》find 这个方法
//  req.query.action  ==> 查找具体的方法
//           getpower     ==》 find  查询
module.exports = function(method, collections, selector, callback) {
  MongoClient.connect(urls, function(err, db) {
    if (err) {
      console.log('获取数据库的链接失败')
      console.log(err)
    } else {
      //获取数据库链接成功  ==》具体方法
      var collection = db.collection(collections)
      methodType[method](db, collection, selector, callback)
    }
  })
}
