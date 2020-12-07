const router1 = require("express").Router();
const fs = require("fs");

var notesArray = []

//api routes

router1.post("/notes",function(request,response){

    notesArray.push(request.body)
    console.log("The request.body is the following: ")
    console.log(request.body)

     fs.writeFile("../data/db.json",JSON.stringify(notesArray),(err)=>console.log(err))

    response.json(request.body)

    console.log("The post request was recieved by the router.")

});

router1.get("/notes",function(request,response){

})

module.exports = router1;