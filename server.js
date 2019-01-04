const express = require("express");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("public"));
// // Serve static content for the app from the "public" directory in the application directory.

//middleware for parsing data as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// // Set Handlebars.

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//routes
require("./routes/apiRoutes");
require("./routes/htmlRoutes");

// // Start our server listening.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Now Scraping: http://localhost:" + PORT);
});

module.exports = app;