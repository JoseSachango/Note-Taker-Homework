const router = require("express").Router();
const fs = require("fs");

var notesArray = []

//api routes

router.post("/api/notes",function(request,response){

    notesArray.push(request.body)

     fs.writeFile("../data/db.json",notesArray,(err)=>console.log(err))

    response.json(request.body)

    console.log("The post request worked.")

});

router.get("/api/notes",function(request,response){
    
})