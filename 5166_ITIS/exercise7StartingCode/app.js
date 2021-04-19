//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const storyRoutes = require('./routes/storyRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let dbUrl = 'mongodb://localhost:27017/demos';
app.set('view engine', 'ejs');

//connect to database
mongoose.connect(dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

//mount middlware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'haiuhadfa98db2eb1dasd', //TODO: store in environment variable
    resave: false,
    saveUninitialized: false, //if false then server will not save the session if it doesn't have any supplementary data
    cookie: { maxAge: 60 * 60 * 1000 }, //1 hour = 60 mins * 60 seconds * 1000 milliseconds
    store: new MongoStore({ mongoUrl: dbUrl }) //default collection name is 'sessions'
}));
app.use(flash());
// append flash messages to locals object
app.use((req, res, next) => {
    res.locals.successMessages = req.flash("success");
    res.locals.errorMessages = req.flash("error");
    next();
});

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/stories', storyRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
    if (req.url != "/favicon.ico") {
        let err = new Error('The server cannot locate ' + req.url);
        err.status = 404;
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', { error: err });
});

//start the server
