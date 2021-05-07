const User = require('../models/user');
const Textbook = require('../models/textbook');
const Inquiry = require('../models/inquiry');

exports.new = (req, res) => {
    res.render('./user/new');
};

exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.exchanges = 0;
    user.save()//insert the document to the database
        .then(user => res.redirect('/users/login'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', err.message);
                return res.redirect('/users/new');
            }

            if (err.code === 11000) {
                req.flash('error', 'Email has been used');
                return res.redirect('/users/new');
            }

            next(err);
        });
};

exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
}

exports.login = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.flash('error', 'Incorrect Email Address or Password'); //subtle hints that email address is wrong
                res.redirect('/users/login');
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.session.user = user._id;
                            req.session.name = user.firstName;
                            req.flash('success', 'You have successfully logged in');
                            res.redirect('/users/profile');
                        } else {
                            req.flash('error', 'Incorrect Password or Email Address'); //subtle hints that password is wrong
                            res.redirect('/users/login');
                        }
                    });
            }
        })
        .catch(err => next(err));
};

exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([User.findById(id).populate("bought"), Textbook.find({ owner: id }), Inquiry.find({ inquiredBy: id }).populate("textbook")])
        .then(results => {
            const [user, textbooks, inquiries] = results;
            active = [];
            sold = [];
            textbooks.forEach(book => {
                if (book.status == "active") {
                    active.push(book);
                } else {
                    sold.push(book);
                }
            });

            promises = [];


            received = [];
            active.forEach(book => {
                promises.push(Inquiry.find({ textbook: book._id }).populate("textbook")
                    .then(books => { books.forEach(b => received.push(b)) })
                    .catch(err => next(err)));
            });




            Promise.all(promises)
                .then(p => {
                    res.render('./user/profile', { user, active, sold, inquiries, received });
                })
                .catch(err => next(err));

        })
        .catch(err => next(err));
};


exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err)
            return next(err);
        else
            res.redirect('/');
    });

};



