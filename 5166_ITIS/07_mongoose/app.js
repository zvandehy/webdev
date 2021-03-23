//require node_modules
const express = require('express');
const morgan = require('morgan');
const storyRoutes = require('./routes/storyRoutes.js');
const methodOverride = require("method-override");
const mongoose = require('mongoose');

//create application
const app = express();

//configure app
let port = 3030;
let host = 'localhost';
app.set('view engine', 'ejs');

// connect db
mongoose.connect('mongodb://localhost:27017/demos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log("Server is running on port", port);
        });
    })
    .catch(err => console.log(err.message));

//mount middleware
app.use(express.static("public")); //send static files
app.use(express.urlencoded({ extended: true })); //send data, handle POST requests
app.use(morgan("tiny")); //log requests and responses in terminal
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