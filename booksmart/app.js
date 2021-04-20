const express = require('express');
const morgan = require('morgan');
const textbookRoutes = require('./routes/textbookRoutes.js');
const generalRoutes = require('./routes/generalRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const methodOverride = require("method-override");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//create application
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let dbURL = 'mongodb://localhost:27017/booksmart'
app.set('view engine', 'ejs');

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log("Server is running on port", port);
        });
    })
    .catch(err => console.log(err.message));

app.use(
    session({
        secret: "aasdfas89fah134rnad98112dasd",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongoUrl: dbURL }),
        cookie: { maxAge: 60 * 60 * 1000 }
    })
)

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static("public")); //send static files
app.use(express.urlencoded({ extended: true })); //send data, handle POST requests
app.use(morgan("tiny")); //log requests and responses in terminal
app.use(methodOverride('_method')); //replace the request method with the value in the query field "_method"

//set up routes
app.use('/textbooks', textbookRoutes); //handle all requests with "/textbooks" prefix with router module
app.use('/users', userRoutes);
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