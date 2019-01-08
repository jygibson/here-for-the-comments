const axios = require("axios");
const cheerio = require("cheerio");

// GET route for scraping the new york times site
app.get("/scrape", function (req, res) {
    //get the html body with axios
    axios.get("https://www.nytimes.com/").then(function (response) {
        //load response into Cheerio
        var $ = cheerio.load(response.data);
        res.send(response.data)
        //grabbing the h2 within the article
        $("article.h2").each(function (i, element) {
            //empty result object
            var result = {};
            //adds the info to the empty results object
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            //creates a new article using the result object we built
            db.Article.create(result).then(function (dbArticle) {
                //views what it is in console
                console.log(dbArticle)
                //catches errors
            }).catch(function (err) {
                return res.json(err);
            })
        });
        //send a response if successful
        res.send("Scrape Complete")
    })

})

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