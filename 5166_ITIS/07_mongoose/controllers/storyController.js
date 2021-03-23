const model = require('../models/story.js');


// GET /stories: send all stories to the user
exports.index = (req, res) => {

    model.find()
        .then(stories => { res.render('./story/index', { stories }) })
        .catch(err => next(err));
};

// GET /stories/new: send the form to create a new story
exports.new = (req, res) => {
    res.render('./story/new');
};

// POST /stories
exports.create = (req, res, next) => {

    // create a new story document
    let story = new model(req.body);

    // insert the document to the database
    story.save()
        .then(story => res.redirect('/stories'))
        .catch(err => {
            if (err.name === "ValidationError") {
                err.status = 400;
            }
            next(err)
        });
};

// GET /stories/:id
exports.show = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}/)) {
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }
    model.findById(id)
        .then(story => {
            if (story) {
                res.render("./story/show", { story });
            } else {
                let err = new Error("Cannot find a story with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// GET /stories/:id/edit
exports.edit = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}/)) {
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }
    model.findById(id)
        .then(story => {
            if (story) {
                res.render("./story/edit", { story });
            } else {
                let err = new Error("Cannot find a story with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// PUT /stories/:id --> Update the story identified by id
exports.update = (req, res, next) => {
    // update this story in DB
    let story = req.body;
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}/)) {
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, story, { useFindAndModify: false, runValidators: true })
        .then(story => {
            if (story) {
                res.redirect('/stories/' + id);
            } else {
                let err = new Error("Cannot find a story with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === "ValidationError") {
                err.status = 400;
            }
            next(err)
        });
};

// DELETE /stories/:id: Delete the story identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}/)) {
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(story => {
            if (story) {
                res.redirect("/stories");
            } else {
                let err = new Error("Cannot find a story with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};