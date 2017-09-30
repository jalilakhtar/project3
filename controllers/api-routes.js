var cheerio = require("cheerio");
var request = require("request");

module.exports = function(app, db) {

    app.post('/save', function(req, res) {
        console.log(req.body);
        // res.json(req.body);
        db.Job.create(req.body).then(function(data) {
            console.log(data);
            res.json(data);
        }).catch(function(err) {
            console.log(err);
        });
    });

    app.get('/scrape', function(req, res) {
        console.log(req.query);
        // res.json({ test: 'test' });
        // Make a request for indeed
        request("https://www.indeed.com/jobs?q=" + req.query.q + "&l=az", function(error, response, html) {
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);
            var dataArray = [];
            // For each element with a "title" class
            $("a.jobtitle").each(function(i, element) {
                // Save the text and href of each link enclosed in the current element
                var title = $(element).text();
                var link = $(element).attr("href");
                var data = {
                    title: title,
                    link: 'https://www.indeed.com/' + link
                };
                // If this found element had both a title and a link
                if (title && link) {
                    dataArray.push(data)
                }
            });
            res.json(dataArray);
        });
    });

    app.get('/saved/all', function(req, res) {
        db.Job.findAll().then(function(jobs) {
            res.json(jobs);
        }).catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });
};