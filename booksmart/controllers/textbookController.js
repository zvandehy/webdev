const model = require('../models/textbook.js');


// GET /textbooks: send all stories to the user
exports.index = (req, res) => {
    let textbooks = model.find();
    res.render('./textbook/index', { textbooks }) //"/views" is implicit
};

// // GET /stories/new: send the form to create a new story
exports.new = (req, res) => {
    res.render('./textbook/new');
};

// // POST /stories
// exports.create = (req, res) => {
//     // save story in DB
//     let story = req.body;
//     model.save(story);

//     // simply redirect, will be captured by /stories endpoint above
//     res.redirect('/stories');
// };

// GET /stories/:id
exports.show = (req, res, next) => {
    let textbook = model.findById(req.params.id);
    if (textbook) {
        res.render("./textbook/show", { textbook: textbook });
    } else {
        let err = new Error("Cannot find a textbook with id " + req.params.id);
        err.status = 404;
        next(err);
    }
};

// // GET /stories/:id/edit
// exports.edit = (req, res, next) => {
//     let story = model.findById(req.params.id);
//     if (story) {
//         res.render("./story/edit", { story });
//     } else {
//         let err = new Error("Cannot find a story with id " + req.params.id);
//         err.status = 404;
//         next(err);
//     }
// };

// // PUT /stories/:id --> Update the story identified by id
// exports.update = (req, res, next) => {
//     // update this story in DB
//     let story = req.body;
//     let id = req.params.id;
//     if (model.updateById(id, story)) {
//         res.redirect('/stories/' + id);
//     } else {
//         let err = new Error("Cannot find a story with id " + id);
//         err.status = 404;
//         next(err);
//     }
// };

// // DELETE /stories/:id: Delete the story identified by id
// exports.delete = (req, res, next) => {
//     if (model.deleteById(req.params.id)) {
//         res.redirect("/stories");
//     } else {
//         let err = new Error("Cannot find a story with id " + req.params.id);
//         err.status = 404;
//         next(err);
//     }
// };