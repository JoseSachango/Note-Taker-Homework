
$(document).ready(function(){


    //Showing the save button when the user inputs to the text area field.
    $("#noteTextArea").on("input",function(){
    
        $("#saveNote").show()
    
    })
    
    //Sending a post request to the /api/notes endpoint
    
    $("#saveNote").on("click",function(){
        
        var randomNumber = Math.floor(Math.random()*1000)
        var uniqueId = $("#noteTitle").val().trim()+randomNumber

        var noteData = {
    
            title: uniqueId,
            text: $("#noteTextArea").val().trim()
        
        }

      

       
        //appending new note to the unordered list
        var noteHtml = `<li  id="${uniqueId}li" class="list-group-item">${$("#noteTitle").val().trim()}<i id="${uniqueId}" class="fa fa-trash float-right" style="color:red"></i></li>`
        
        $("ul").append(noteHtml)
        //----
    
        $.post("/api/notes",noteData).then((response)=>{
            console.log(response)
            console.log("The post was sent and the response has been recieved.")
        })

      


    
    
        $("#noteTitle").val("")
        $("#noteTextArea").val("")
    
        $("#saveNote").hide()


    
    })

    //making a get request for the data in db.json   
    $.get("/api/notes",function(data){

        console.log("Trying to hit the notesArray endpoint")
        console.log(data)
        console.log("The statment above is the data returned from the api Route")

        console.log("The title data returned from the get request to /api/notesArray is below: ")
        console.log(JSON.parse(data))


        
        
    })


      //if delete button is clicked then you want to call a delete request
    $("body").click(function(event){

                //make a get request to /api/notes to get the array of note objects. 
            if (event.target.getAttribute("class")==="fa fa-trash float-right" ){

                console.log("The id of the event is the following : ")
                console.log(event.target.getAttribute("id"))

                //removing list item from the client
                $(`#${event.target.getAttribute("id")}li`).remove()

                $.ajax(
                    {
                        url: `/api/notes/${event.target.getAttribute("id")}`,
                        method: "DELETE"
                    }

                ).then((data)=>{

                    console.log("The response below was returned after submitting a delete request: ")
                    console.log(data)

                }).catch((err)=>{
                    console.log(err)
                })
                
            }else{
                
                console.log(event.target.getAttribute("class"))
            }

    }) 



    

});