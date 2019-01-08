$(document).ready(function(){
// $.getJSON("/articles", function(data){
//     for (let i=0; i<data.length; i++){
//         $("#articles").append("<p data-id='"+ data[i]._id + "'>"+data[i].title + "<br />" + data[i].link + "</p>");

//     }
// });

function pageOpen(){
    $.getJSON("/articles").then(function(data){
        $("#articles").empty();
        if (data && data.length){
            displayArticles(data);
        }
    })
};

function displayArticles(articles){
    //create an empty array to hold the new cards
    var cards = [];
    //for loop using the createNewCard function to build them
    for (let i=0; i < articles.length; i++){
        cards.push(createNewCard(articles[i]));
    }
    //append to display to the page
    $("#articles").append(cards);
};

function createNewCard(article){
    var newCard = $("<div class= 'card'>");
    var cardTitle = $("<div class = 'card-header'>").append(
        $("<h3>").append(
            $("<a class='article-link' target='_blank'>")
              .attr("href", article.link)
              .text(article.title),
            $("<a class='btn btn-success save'>Save Article</a>")
          )
    );
    var cardBody = $("<div class = 'card-body'>").text(article.summary);
    newCard.append(cardTitle, cardBody);
    newCard.data("_id", article._id);
    return newCard;
}

pageOpen();
});