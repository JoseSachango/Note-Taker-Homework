
$(document).ready(function(){

    console.log("This is the local storage length: ")
    console.log(localStorage.length)

    var emptyNoteCol = 
            `<div class="card">
            <ul class="list-group">
            </ul>
        </div>`
    
    
    
    //localStorage.clear()
    if(localStorage.length===0||localStorage.getItem("noteColHtml")===emptyNoteCol){
        $("ul").append(`<li id="startingLi" class="list-group-item">No Saved Notes</li>`)
    }else{

        $(".col-4").html(localStorage.getItem("noteColHtml"))
    }

        

    

    

    //Showing the save button when the user inputs to the text area field.
    $("#noteTextArea").on("input",function(){
    
        $("#saveNote").show()
    
    })
    //---
    
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
        $("#startingLi").remove()
        $("ul").append(noteHtml)
        localStorage.setItem("noteColHtml",$(".col-4").html())
        //----

        //saving list item to localstorage
        localStorage.setItem(`${$("#noteTitle").val().trim()}`,$("#noteTextArea").val().trim())

        console.log("The container that holds the lists: ")
        console.log(localStorage.getItem(`${$("#noteTitle").val().trim()}`))
        //--
    
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

                console.log("The event.target.parentNode.childNodes[0].data is the following : ")
                console.log(event.target.parentNode.childNodes[0].data)
                //--
                localStorage.removeItem(event.target.parentNode.childNodes[0].data)
                
                //--

               

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

                
               
                
            }

            else if(event.target.getAttribute("class")==="list-group-item"){

                /*
                var listItemId = event.target.getAttribute("id")
                console.log("Target html: ")
                console.log(event.target.childNodes[0].data)

                console.log("Target id: ")
                console.log(listItemId)
                console.log(localStorage.getItem(listItemId))
                */

                $("#noteTitle").val(event.target.childNodes[0].data)
                $("#noteTextArea").val(localStorage.getItem(event.target.childNodes[0].data)                                             )

            }
            
            else{
                
                console.log(event.target.getAttribute("class"))
            }

             //removing list item from the client
             $(`#${event.target.getAttribute("id")}li`).remove()
             localStorage.setItem("noteColHtml",$(".col-4").html())

             console.log("What is this below")
             console.log(`#${event.target.getAttribute("id")}li`)
             console.log(`#${event.target.getAttribute("id")}`)

            

    }) 



    

});