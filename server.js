var express = require("express");
var app = express();
app.get("/", function(req, res){
    res.send("working");
})

// Requiring our models for syncing
// var db = require("./models");
// console.log(db);

app.listen(3000, function(){
    console.log("app is running on port 3000");
})

