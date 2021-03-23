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
exports.create = (req, res) => {
    // save story in DB
    let story = req.body;
    story.createdAt = new Date();
    model.save(story)
        .then(result => res.redirect('/stories'))
        .catch(err => next(err));
};

// GET /stories/:id
exports.show = (req, res, next) => {
    model.findById(req.params.id)
        .then(story => {
            if (story) {
                res.render("./story/show", { story });
            } else {
                let err = new Error("Cannot find a story with id " + req.params.id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// GET /stories/:id/edit
exports.edit = (req, res, next) => {
    model.findById(req.params.id)
        .then(story => {
            if (story) {
                res.render("./story/edit", { story });
            } else {
                let err = new Error("Cannot find a story with id " + req.params.id);
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
    model.updateById(id, story)
        .then(result => {
            if (result.lastErrorObject.updatedExisting) {
                res.redirect('/stories/' + id);
            } else {
                let err = new Error("Cannot find a story with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// DELETE /stories/:id: Delete the story identified by id
exports.delete = (req, res, next) => {
    model.deleteById(req.params.id)
        .then(result => {
            if (result.deletedCount == 1) {
                res.redirect("/stories");
            } else {
                let err = new Error("Cannot find a story with id " + req.params.id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};