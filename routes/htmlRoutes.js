
module.exports = function(app){
 //this loads the index page
    app.get("/", function(req, res) {
        res.render("index");
      });
    
    //this loads the saved articles page
    app.get("/saved", function(req, res){
        res.render("saved");
    })
}

    //question for ronny/eric/glenn - why does this work in the server page, but not on this page?
