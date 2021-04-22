const model = require('../models/textbook.js');

// GET /textbooks: send all textbooks to the user
exports.index = (req, res, next) => {
    let categorized = {
        "Architecture": [],
        "Business": [],
        "Computer Science": [],
        "Creative Arts": [],
        "Education": [],
        "Engineering": [],
        "Health & Medicine": [],
        "Humanities": [],
        "Pure Sciences": [],
        "Social Studies": [],
    };



    model.find()
        .then(textbooks => {
            textbooks.forEach((textbook) => {
                if (textbook.subject) {
                    if (categorized[textbook.subject]) {
                        categorized[textbook.subject].push(textbook);
                    } else {
                        categorized[textbook.subject] = [textbook];
                    }

                } else {
                    console.log("Textbook has no subject");
                    console.log(textbook);
                }
            });
            res.render('./textbook/index', { categorized: categorized, count: textbooks.length })
        })
        .catch(err => next(err));
};

// GET /textbooks/new: send the form to create a new listing
exports.new = (req, res) => {
    res.render('./textbook/new');
};

// POST /textbooks
exports.create = (req, res, next) => {
    // TODO: upload image
    // var { fields, files } = await asyncBusboy(req);
    // var imageName = "";
    // files.map(file => {
    //     if(file.filename != ""){
    //         imageName = file.filename;
    //         const saveTo = path.join('../assets/images',file.filename);
    //         file.pipe(fs.createWriteStream(saveTo));
    //     } else {
    //         errors.push({msg: "Invalid profile photo"});
    //     }
    // });
    // console.group("req");
    // console.log(req.url);
    // console.log(req.body);
    // console.groupEnd();

    // save textbook in DB
    let textbook = new model(req.body);
    textbook.owner = req.session.user;
    textbook.save()
        .then(t => {
            req.flash("success", "Successfully created the textbook listing!")
            res.redirect('/textbooks');
        })
        .catch(err => {
            if (err.name === "ValidationError") {
                req.flash('error', err.message);
                res.redirect("back");
            }
        });
};

// GET /stories/:id
exports.show = (req, res, next) => {
    let id = req.params.id;

    model.findById(id).populate("owner", "exchanges")
        .then(textbook => {
            if (textbook) {
                res.render("./textbook/show", { textbook: textbook });
            } else {
                let err = new Error("Cannot find a textbook with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// GET /textbooks/:id/edit
exports.edit = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}/)) {
        let err = new Error("Invalid textbook id");
        err.status = 400;
        return next(err);
    }

    model.findById(id)
        .then(textbook => {
            if (textbook) {
                res.render("./textbook/edit", { textbook: textbook });
            } else {
                let err = new Error("Cannot find a textbook with id " + req.params.id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));

};

// PUT /textbooks/:id --> Update the textbook identified by id
exports.update = (req, res, next) => {

    console.log(req.body);
    // update this textbook in DB
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}/)) {
        let err = new Error("Invalid textbook id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, req.body, { useFindAndModify: false, runValidators: true })
        .then(textbook => {
            if (textbook) {
                req.flash("success", "Successfully updated the textbook listing!")
                res.redirect('/textbooks/' + id);
            } else {
                let err = new Error("Cannot find a textbook with id " + id);
                err.status = 404;
                err.method
                next(err);
            }
        })
        .catch(err => {
            if (err.name === "ValidationError") {
                req.flash('error', err.message);
                res.redirect("back");
            }
        });
};

// DELETE /textbooks/:id: Delete the textbook listing identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}/)) {
        let err = new Error("Invalid textbook id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(textbook => {
            if (textbook) {
                req.flash("success", "Successfully deleted the textbook listing!")
                res.redirect('/textbooks');
            } else {
                let err = new Error("Cannot find a textbook with id " + req.params.id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};