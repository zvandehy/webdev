const { body } = require('express-validator');
const { validationResult } = require("express-validator");

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', "First Name cannot be empty").notEmpty().trim().escape(),
body('lastName', "Last Name cannot be empty").notEmpty().trim().escape(),
body('email', "Email must be a valid email address").isEmail().trim().escape().normalizeEmail(),
body('password', "Password must be at least 8 and at most 64 characters.").isLength({ min: 8, max: 64 })];

exports.validateLogIn = [body('email', "Email must be a valid email address").isEmail().trim().escape().normalizeEmail(),
body('password', "Password must be at least 8 and at most 64 characters.").isLength({ min: 8, max: 64 })];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    console.log(errors.array())
    if (!errors.isEmpty()) {
        errors.array().forEach(err => {
            req.flash('error', err.msg);
        })
        return res.redirect("back");
    }
    else {
        return next();
    }
};

exports.validateStory = [
    body("title", "Title cannot be empty").notEmpty().trim().escape(),
    body("content", "Content must be at least 10 characters long").trim().escape(),
];