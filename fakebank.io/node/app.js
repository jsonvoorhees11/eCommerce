var express = require("express");
var app = express();
var mongo = require("mongodb");
var assert = require("assert");

var MongoClient = mongo.MongoClient;

app.set("view engine", "ejs");
var url = "mongodb://localhost:27017/test_mongo";


app.get("/account/", function (req, res) {
    MongoClient.connect(url, function (err, db) {
        //assert(null,err);
        if (err) {
            console.log(err);
        }
        var resultArray = [];
        var database = db.db('test_mongo');
        var collection = database.collection('test_mongo');
        var cursor = collection.find();
        cursor.forEach(function (item) {
            resultArray.push(item);
        }, function () {
            console.log("DB connected");
            res.render('accountlist', { items: resultArray });
            db.close();
        });
    });

});
// app.post("/account",function(req,res){
//     var accountItem = {
//         loginName: req.body.lgname,
//         password:  req.body.password,
//         balance: req.body.balance,
//     }

//     mongo.connect(url,function(err,db){
//         assert(null,err);
//         db.collection('account-data').insertOne(accountItem,function(err,result){
//             assert(null,err);
//             console.log("Insert: ",result);
//             db.close();
//         });
//     });
//     res.redirect('/account');
// });
app.put("/account", function () {

});
app.delete("/account", function () {

});
app.listen(3000, function () {
    console.log("Listening at port 3000");
});