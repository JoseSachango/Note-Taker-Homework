

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