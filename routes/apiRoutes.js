const router1 = require("express").Router();
const fs = require("fs");
const path = require("path")

var notesArray = []

//api routes

router1.post("/notes",function(request,response){

    notesArray.push(request.body)
    

     fs.writeFile(path.join(__dirname,"./../data/db.json"),JSON.stringify(notesArray),(err)=>console.log(err))

    response.json(request.body)


});

router1.get("/notes",(request, response) => {

        fs.readFile(path.join(__dirname,"./../data/db.json"), function (err, data) {

            if(err) throw err;


           

            response.end(data)
    

        });

        
    })

router1.delete("/notes/:character",function(request,response){

    var chosenId = request.params.character;

    fs.readFile(path.join(__dirname,"./../data/db.json"),function(err,data){

        var dataRead = JSON.parse(data)
        
        console.log("This is the dataRead before the splice: ")
        console.log(dataRead)

        for(let i in dataRead){
    
            if(chosenId===dataRead[i].title){
                

                dataRead.splice(i,1);
                
                fs.writeFile(path.join(__dirname,"./../data/db.json"),JSON.stringify(dataRead),(err)=>console.log(err))
            }
        }

        console.log("This is the dataRead after the splice: ")
        console.log(dataRead)

        response.json(dataRead)
    });




})

module.exports = router1;