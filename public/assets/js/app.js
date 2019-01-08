$.getJSON("/articles", function(data){
    for (let i=0; i<data.length; i++){
        $("#articles").append("<p data-id='"+ data[i]._id + "'>"+data[i].title + "<br />" + data[i].link + "</p>");
    }
});

$(document).on("click", "p", function(){
    $("#notes").empty();
    //the data-id attr was assigned above in the for loop
    var thisId = $(this).attr("data-id");

    //calling for the article using ajax
    $.ajax({
        method: "GET",
        url: "/articles/"+ thisId
    })
    .then(function(data){
        console.log(data)
    })
})