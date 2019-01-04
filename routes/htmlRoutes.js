
module.exports = function(app){
    //this loads the index page
    app.get("/", function(req, res) {
        res.send("testing");
        res.render("index");
      });
    
    //this loads the saved articles page
    app.get("/saved", function(req, res){
        res.render("saved");
    })
}