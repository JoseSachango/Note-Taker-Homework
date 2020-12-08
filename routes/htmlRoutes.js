const router2 = require("express").Router()
var path  = require("path")

//html Routes
router2.get("/",function(request,response){
    response.sendFile(path.join(__dirname,"../public/index.html"))
});

router2.get("/notes",function(request,response){
    response.sendFile(path.join(__dirname,"../public/notes.html"))
});


router2.get("*",function(request,response){
    response.sendFile(path.join(__dirname,"../public/index.html"))
});



module.exports = router2;