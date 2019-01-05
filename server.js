const express = require("express");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var PORT = process.env.PORT || 3000;
var app = express();
const exphbs = require("express-handlebars");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(express.static("public"));
// // Serve static content for the app from the "public" directory in the application directory.

//middleware for parsing data as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// // Set Handlebars.

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//routes
app.get("/", function(req, res) {
  console.log("stuff")
  res.render("index");
});

//this loads the saved articles page
app.get("/saved", function(req, res){
  console.log("things")
  res.render("saved");
})


// // Start our server listening.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Now Scraping: http://localhost:" + PORT);
});

module.exports = app;