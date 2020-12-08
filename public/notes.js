
$(document).ready(function(){

    
    

    var emptyNoteCol = `
            <div class="card">
              <ul class="list-group">
              </ul>
            </div>`;
    
    
    if(localStorage.getItem("noteColHtml")){
        var comparingHtml = localStorage.getItem("noteColHtml").trim().replace(/\s+/g, " ")==emptyNoteCol.trim().replace(/\s+/g, " ")
    }else{
        var comparingHtml = false;
    }
    //localStorage.clear()
    if(localStorage.length===0 || comparingHtml){
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
        var uniqueId = $("#noteTitle").val().trim().replace(/\s/g,'')+randomNumber

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

        //--
    
        $.post("/api/notes",noteData).then((response)=>{
            console.log(response)
        })

      


    
    
        $("#noteTitle").val("")
        $("#noteTextArea").val("")
    
        $("#saveNote").hide()


    
    })

    //making a get request for the data in db.json   
    $.get("/api/notes",function(data){

        console.log(JSON.parse(data))

        
    })


      //if delete button is clicked then you want to call a delete request
    $("body").click(function(event){

                //make a get request to /api/notes to get the array of note objects. 
            if (event.target.getAttribute("class")==="fa fa-trash float-right" ){

                //--
                localStorage.removeItem(event.target.parentNode.childNodes[0].data)
                //--

               

                $.ajax(
                    {
                        url: `/api/notes/${event.target.getAttribute("id")}`,
                        method: "DELETE"
                    }

                ).then((data)=>{

                    console.log(data)

                }).catch((err)=>{
                    console.log(err)
                })

                
               
                
            }

            else if(event.target.getAttribute("class")==="list-group-item"){

            

                $("#noteTitle").val(event.target.childNodes[0].data)
                $("#noteTextArea").val(localStorage.getItem(event.target.childNodes[0].data)                                             )

            }
            
            else{
                
                console.log(event.target.getAttribute("class"))
            }

             //removing list item from the client

          


             $(`#${event.target.getAttribute("id")}li`).remove()
             localStorage.setItem("noteColHtml",$(".col-4").html())

           

            

    }) 



    

});