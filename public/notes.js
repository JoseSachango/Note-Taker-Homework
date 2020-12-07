
$(document).ready(function(){


    //Showing the save button when the user inputs to the text area field.
    $("#noteTextArea").on("input",function(){
    
        $("#saveNote").show()
    
    })
    
    //Sending a post request to the /api/notes endpoint
    
    $("#saveNote").on("click",function(){
    
        var noteData = {
    
            title: $("#noteTitle").val().trim(),
            text: $("#noteTextArea").val().trim()
        
        }
    
        $.post("/api/notes",noteData).then((response)=>{
            console.log(response)
            console.log("The post was sent and the response has been recieved.")
        })
    
    
        $("#noteTitle").val("")
        $("#noteTextArea").val("")
    
        $("#saveNote").hide()
    
    })

    //making a get request for the data in db.json   
    $.get("/notesArray",function(err,data){
        console.log("Trying to hit the notesArray endpoint")
        console.log(data)
        console.log("The statment above is the data returned from the api Route")
        
    })

    

});