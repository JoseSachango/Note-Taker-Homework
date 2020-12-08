const router1 = require("express").Router();
const fs = require("fs");
const path = require("path")

var notesArray = []

//api routes

router1.post("/notes",function(request,response){

    notesArray.push(request.body)
    console.log("The request.body is the following: ")
    console.log(request.body)

     fs.writeFile(path.join(__dirname,"./../data/db.json"),JSON.stringify(notesArray),(err)=>console.log(err))

    response.json(request.body)

    console.log("The post request was recieved by the router.")

});

router1.get("/notesArray",function(request,response){

    fs.readFile("./../data/db.json",function(err,data){

        //response.writeHead(200,{"Content-type":"text/html"})

        //response.json("Data testing testing")
        //response.end("Data testing testing")
        

        console.log("A get request to the /notes endpoint was made. The data is the following: ")
        //console.log(data)

    })

    response.json("Data testing testing")
})

module.exports = router1;