const model = require('../models/textbook.js');

// GET / : home page
exports.home = (req, res) => {
    res.render('index.ejs');
};

// GET /about : about page
exports.about = (req, res) => {
    res.render('about.ejs');
};

// GET /contact : contact page
exports.contact = (req, res) => {
    res.render('contact.ejs');
};
