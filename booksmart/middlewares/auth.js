const Textbook = require("../models/textbook");
const Inquiry = require("../models/inquiry");

exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        req.flash("error", "You are already logged in.");
        res.redirect("/users/profile");
    }
}

exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        req.flash("error", "You must be logged in first.");
        res.redirect("/users/login");
    }
}

exports.isOwner = (req, res, next) => {
    let id = req.params.id;
    Textbook.findById(id)
        .then((textbook) => {
            if (textbook) {
                if (textbook.owner == req.session.user) {
                    return next()
                } else {
                    let err = new Error("Unauthorized to access the resource");
                    err.status = 401;
                    return next(err);
                }
            }
        })
        .catch(err => next(err));
}

exports.isNotOwner = (req, res, next) => {
    let id = req.body.textbook;
    Textbook.findById(id)
        .then((textbook) => {
            if (textbook) {
                if (textbook.owner != req.session.user) {
                    return next()
                } else {
                    let err = new Error("Unauthorized to access the resource.");
                    err.status = 401;
                    return next(err);
                }
            }
        })
        .catch(err => next(err));
}

exports.isInquiredBy = (req, res, next) => {
    let id = req.params.id;
    Inquiry.findById(id)
        .then((inquiry) => {
            if (inquiry) {
                if (inquiry.inquiredBy == req.session.user) {
                    return next()
                } else {
                    let err = new Error("Unauthorized to access the resource");
                    err.status = 401;
                    return next(err);
                }
            }
        })
        .catch(err => next(err));
}

exports.isInquiredByOrOwner = (req, res, next) => {
    let id = req.params.id;
    Inquiry.findById(id).populate("textbook")
        .then((inquiry) => {
            if (inquiry) {
                if (inquiry.inquiredBy == req.session.user || inquiry.textbook.owner == req.session.user) {
                    return next()
                } else {
                    let err = new Error("Unauthorized to access the resource");
                    err.status = 401;
                    return next(err);
                }
            }
        })
        .catch(err => next(err));
}

exports.inquiryAlreadyExists = (req, res, next) => {
    let inquiry = new Inquiry(req.body);
    inquiry.inquiredBy = req.session.user;
    //check if user already inquired about this textbook
    Inquiry.findOne({ inquiredBy: inquiry.inquiredBy, textbook: inquiry.textbook })
        .then(found => {
            if (found == null) {
                return next();
            } else {
                req.flash("error", "You have already contacted the seller about this textbook. Redirecting to your existing inquiry.");
                res.redirect("/inquiries/" + found._id);
            }
        })
        .catch(err => next(err));
}