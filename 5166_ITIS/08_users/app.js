//require modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/user')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let dbUrl = 'mongodb://localhost:27017/demos'
app.set('view engine', 'ejs');

//connect to database
mongoose.connect(dbUrl,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use(session({
    secret: 'haiuhadfa98db2eb1dasd', //TODO: store in environment variable
    resave: false,
    saveUninitialized: false, //if false then server will not save the session if it doesn't have any supplementary data
    cookie: { maxAge: 60 * 60 * 1000 }, //1 hour = 60 mins * 60 seconds * 1000 milliseconds
    store: new MongoStore({ mongoUrl: dbUrl }) //default collection name is 'sessions'
}));

// flash can only be mounted after the session
app.use(flash());

app.use((req, res, next) => {
    console.log(req.session);
    // retrieve flash messages and save them in locals object
    // templates always have access to this object
    res.locals.successMessages = req.flash("success");
    res.locals.errorMessages = req.flash("error");
    next();
})

//set up routes
app.get('/', (req, res) => {
    res.render('index');
});

// get the sign up form
app.get("/new", (req, res) => {
    res.render('new');
});

// create a new user
app.post('/', (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then(() => res.redirect('/login'))
        .catch(err => {
            if (err.name === "ValidationError") {
                req.flash('error', err.message);
                return res.redirect('/new');
            }
            if (err.code === 11000) {
                req.flash('error', 'Email address is already registered with another account');
                return res.redirect('/new');
            }
            next(err)
        });
});

app.get('/login', (req, res) => {

    res.render('login');
});

app.post('/login', (req, res) => {
    // authenticate login request
    let email = req.body.email;
    let password = req.body.password;

    // get user that matches the email
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                // user with email is found
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id; // store user's id in the session. this adds information so it saves the session
                            req.flash('success', "You have successfully logged in!")
                            res.redirect('/profile');
                        } else {
                            console.log("password is incorrect");
                            req.flash("error", "password is incorrect");
                            res.redirect('/login');
                        }
                    })
                    .catch(err => next(err));
            } else {
                console.log("no matching email found");
                req.flash("error", "email not found");
                res.redirect("/login");
            }
        })
        .catch(err => next(err));
});

app.get('/profile', (req, res, next) => {
    let id = req.session.user;
    User.findById(id)
        .then(user => res.render('profile', { user }))
        .catch(err => next(err));
});

app.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
});


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
