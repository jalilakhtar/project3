var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var fs = require('fs');

var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// first checks to make sure NODE_ENV is in development mode (ie not production mode)
if (process.env.NODE_ENV !== 'production') {
    console.log('NODE_ENV is in development mode.' +
        '\nConfiguring webpack-dev-middleware and webpack-hot-middleware...');

    // dependendies for webpack middleware
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        config = require('./webpack.dev.js');
    var compiler = webpack(config);


    // webpack-dev-middleware emits files compiled by webpack to a live server.
    // webpack-hot-middleware allows hot reload of webpack with express server (just refresh page).
    // more info about webpack-dev-middleware at:
    // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
    // https://github.com/webpack/webpack-dev-middleware
    // for info on integrating hot-middleware and dev-middleware see section "Server" at:
    // https://ditrospecta.com/javascript/react/es6/webpack/heroku/2015/08/08/deploying-react-webpack-heroku.html

    // configures webpack middlewares in development mode
    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
}


// Requiring our models for syncing
var db = require('./models');

// attempts to establish connection to mysql server
db.sequelize.sync().then(function() {
    // listens to port for running server
    app.listen(PORT, function() {
        console.log("app is running on port", PORT);
        require('./controllers/api-routes.js')(app, db);
    });
}).catch(function(err) {
    console.log('Error: Failed to establish connection with MySQL.');
});