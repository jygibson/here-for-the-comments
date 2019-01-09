const express = require("express");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var PORT = process.env.PORT || 3000;
var app = express();
const exphbs = require("express-handlebars");
const db = require("./models");
const axios = require("axios");
const cheerio = require("cheerio");
const path= require("path");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//tests database connections
var test = mongoose.connection;
test.on('error', console.error.bind(console, 'connection error:'));
test.once('open', function() {
  console.log("we're connected!")
});

app.use(express.static(path.join(__dirname, '/public')));
// // Serve static content for the app from the "public" directory in the application directory.

//middleware for parsing data as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// GET route for scraping the new york times site
app.get("/scrape", function (req, res) {
    //get the html body with axios
    axios.get("https://www.nytimes.com/").then(function (response) {
        //load response into Cheerio
        var $ = cheerio.load(response.data);
        //grabbing the h2 within the article
        $(".css-6p6lnl").each(function (i, element) {
            //empty result object
            var result = {};
            //adds the info to the empty results object
            result.link = $(this).children("a").attr("href");
            result.title = $(this).children("a").text();
            console.log(result);
            //creates a new article using the result object we built
            db.Article.create(result)
            .then(function(dbArticle) {
                //views what it is in console
                console.log(dbArticle)
                //catches errors
            })
            .catch(function (err) {
            return res.json(err);
            });
        });
        //send a response if successful
        res.send("scrape complete"); 
    });
});

//GET route for the articles in the database
app.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.json(dbArticle);
    }).catch(function (err) {
        res.json(err)
    });
});

app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note").then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err)
        });
});

app.post("/articles/:id", function (req, res) {
    db.Comments.create(req.body).then(function (dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbComment }, { new: true })
    }).then(function (dbArticle) {
        res.json(dbArticle);
    })
        .catch(function (err) {
            res.json(err)
        });
});

//routes
// require("./routes/apiRoutes");
// require("./routes/htmlRoutes");

// // Set Handlebars.

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("index");
});

//this loads the saved articles page
app.get("/saved", function(req, res){
  res.render("saved");
})

// // Start our server listening.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Now Scraping: http://localhost:" + PORT);
});

module.exports = app;