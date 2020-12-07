const router = require("express").Router()


//html Routes
router.get("/",function(request,response){
    response.sendFile(path.join(__dirname,"../public/assets/index.html"))
});

router.get("*",function(request,response){
    response.sendFile(path.join(__dirname,"../public/assets/index.html"))
});

router.get("/notes",function(request,response){
    response.sendFile(path.join(__dirname,"../public/notes.html"))
});



module.exports = router