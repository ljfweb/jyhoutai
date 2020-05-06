var mongo=require("mongodb");//@2.2.11
var MongoClient = mongo.MongoClient;
var assert = require('assert');
var url = require('url');
var host="localhost";
var port="27017";
var Urls = 'mongodb://localhost:27017/administor';


//add一条数据
var add = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.insertMany([selector],function(err,result){
    assert.equal(err,null);
    fn(result);
    db.close();
  });
}
//delete
var deletes = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  collection.deleteOne(selector,function(err,result){
    try{assert.equal(err,null)}catch(e){
      console.log(e);
    };
    //assert.equal(1,result.result.n);
    fn(result);
    db.close;
  });
  db.collection(collections, function (err,collection) {
    if (err){throw err;}
    else {
        console.log(selector);
      collection.remove(selector,function(err,result){
        if (err){

          throw  err;
        }
        else {
          //res.end('{"success":"true"}');

          fn(result);
          db.close();
        }
      });



    }

  });
};
//find
var find = function(db,collections,selector,fn){
  //collections="hashtable";
  var collection = db.collection(collections);
  // console.log("777777777777");
  // console.log(selector);
  // if(!selector){
  //   console.log("445566");
  //   var newArr = [];
  //   var ltlimit = 0;
  //   var limit = 50;
  //     var finds = function(db,collection,fn){
  //       collection.find().limit(limit).skip(ltlimit).toArray(function(err,docstart){
  //         ltlimit+=limit;
  //         newArr = newArr.concat(docstart);
  //         console.log("2222");
  //         //console.log(newArr);
  //          if(docstart&&docstart.length===limit){
  //            finds(db,collection,fn);
  //          }else{
  //           fn(newArr);
  //           db.close();
  //         }
  //       });
  //     }
  //   finds(db,collection,fn);
  // }else {
    collection.find(selector).toArray(function(err,docs){
      //console.log("888888888");
      //console.log(docs);
      try{
        assert.equal(err,null);
      }catch(e){
        console.log(e);
        docs = [];
      }

      fn(docs);
      db.close();
    });
  //}

}
MongoClient.connect(Urls, function(err, db) {
  find(db,"powers",null,function(d){
    console.log("123s");
    console.log(d.length);
  });
});

//update
var updates = function(db,collections,selector,fn){
  var collection = db.collection(collections);
  console.log(selector);
  collection.updateOne(selector[0],selector[1],function(err,result){
    assert.equal(err,null);
    assert.equal(1,result.result.n);
    fn(result);
    db.close();
  });

}
var methodType = {
  login:find,
  show:find,
  add:add,
  getpower:find,
  update:updates,
  delete:deletes,
  updatepass:updates,
  adduser:add,
  usershow:find,
  getcategory:find,
  getcourse:find,
  find:find,
  state:find,
  top:find,
  AddDirectory:find,
  updateDirectory:updates,
  deleteDirectory:deletes,
  showlist:find,
  showdir:find
};
//主逻辑
module.exports = function(req,res,collections,selector,fn){
  MongoClient.connect(Urls, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    methodType[req.query.action](db,collections,selector,fn);
    db.close();
  });

};

