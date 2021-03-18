const express = require('express');
const morgan = require('morgan');
const textbookRoutes = require('./routes/textbookRoutes.js');
const generalRoutes = require('./routes/generalRoutes.js');
const methodOverride = require("method-override");

//create application
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static("public")); //send static files
app.use(express.urlencoded({ extended: true })); //send data, handle POST requests
app.use(morgan("tiny")); //log requests and responses in terminal
app.use(methodOverride('_method')); //replace the request method with the value in the query field "_method"

//set up routes
app.use('/textbooks', textbookRoutes); //handle all requests with "/textbooks" prefix with router module
app.use("/", generalRoutes);

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

//start the server
app.listen(port, host, () => {
    console.log("Server started on port " + port);
})