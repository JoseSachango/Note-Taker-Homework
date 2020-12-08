var express = require("express");


var app = express()


var PORT = process.env.PORT || 3005;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"))

app.use("/api",require("./routes/apiRoutes.js"))
app.use("/",require("./routes/htmlRoutes.js"))





app.listen(PORT,function(){
    console.log("Server up and running")
})