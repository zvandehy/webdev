const User = require('../models/user');
const flash = require('connect-flash');

// GET/new: give form to create user
exports.signup = (req, res, next) => {
    res.render('./user/new');
};
// POST/users: create user
exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
        .then(() => {
            req.flash('success', "Your account was successfully created! Now, use your credentials to log in!");
            res.redirect('/users/login');
        })
        .catch(err => {
            if (err.name === "ValidationError") {
                req.flash('error', err.message);
                return res.redirect('/users/new');
            }
            if (err.code === 11000) {
                req.flash('error', 'Email address is already registered with another account');
                return res.redirect('/users/new');
            }
            next(err)
        });
};
// GET/login: form for login
exports.login = (req, res, next) => {
    res.render('./user/login');
};
// POST/login: authenticate login
exports.authenticate = (req, res, next) => {
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
                            res.redirect('/users/profile');
                        } else {
                            console.log("password is incorrect");
                            req.flash("error", "password is incorrect");
                            res.redirect('/users/login');
                        }
                    })
                    .catch(err => next(err));
            } else {
                console.log("no matching email found");
                req.flash("error", "email not found");
                res.redirect("/users/login");
            }
        })
        .catch(err => next(err));
};
// GET/profile: show profile
exports.profile = (req, res, next) => {
    let id = req.session.user;
    User.findById(id)
        .then(user => res.render('./user/profile', { user }))
        .catch(err => next(err));
};
// get/logout: log user out
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};
