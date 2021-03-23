//require node_modules
const express = require('express');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes.js');
const { MongoClient } = require('mongodb');
const methodOverride = require("method-override");
const { initCollection } = require('./models/story.js');

//create application
const app = express();

//configure app
let port = 3030;
let host = 'localhost';
let dburl = "mongodb://localhost:27017";
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static("public")); //send static files
app.use(express.urlencoded({ extended: true })); //send data, handle POST requests
app.use(morgan("tiny")); //log requests and responses in terminal

// connect db
MongoClient.connect(dburl, { useUnifiedTopology: true })
    .then(client => {
        db = client.db("demos");
        initCollection(db);
        //start the server
        app.listen(port, host, () => {
            console.log("Server started on port " + port);
        });
    })
    .catch(err => console.log(err.message));

// It's important that methodOverride is called before routes
app.use(methodOverride('_method')); //replace the request method with the value in the query field "_method"

//set up routes
app.use('/stories', storyRoutes); //handle all requests with "/stories" prefix with router module
app.get("/", (req, res) => {
    res.render('index');
});

// error handling should be last
// 404 handler
app.use((req, res, next) => {
    let err = new Error("The server cannot locate " + req.url);
    err.status = 404;
    next(err);
});
// internal server error handler
app.use((err, req, res, next) => {
    if (!err.status) {
        console.log(err.stack);
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render("error", { error: err });
});