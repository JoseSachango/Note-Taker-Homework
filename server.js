var express = require("express");
var path  = require("path")

var app = express()


var PORT = process.env.PORT || 3003;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"))


//html Routes
app.get("/index.html",function(request,response){
    response.sendFile(path.join(__dirname,"/public/assets/index.html"))
});
