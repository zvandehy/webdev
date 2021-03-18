const model = require('../models/textbook.js');

// GET /textbooks: send all textbooks to the user
exports.index = (req, res) => {
    let textbooks = model.find();
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

    textbooks.forEach((textbook) => {
        if (textbook.subject) {
            categorized[textbook.subject].push(textbook);
        } else {
            console.log("Textbook has no subject");
            console.log(textbook);
        }
    });

    res.render('./textbook/index', { categorized: categorized, count: textbooks.length }) //"/views" is implicit
};

// // GET /textbooks/new: send the form to create a new listing
exports.new = (req, res) => {
    res.render('./textbook/new');
};

// POST /textbooks
exports.create = (req, res) => {
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
    console.group("req");
    console.log(req.url);
    console.log(req.body);
    console.groupEnd();
    // save textbook in DB
    let textbook = req.body;
    model.save(textbook);

    // simply redirect, will be captured by /stories endpoint above
    res.redirect('/textbooks');
};

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

// GET /textbooks/:id/edit
exports.edit = (req, res, next) => {
    let textbook = model.findById(req.params.id);
    if (textbook) {
        res.render("./textbook/edit", { textbook: textbook });
    } else {
        let err = new Error("Cannot find a textbook with id " + req.params.id);
        err.status = 404;
        next(err);
    }
};

// PUT /textbooks/:id --> Update the textbook identified by id
exports.update = (req, res, next) => {
    // update this textbook in DB
    let textbook = req.body;
    let id = req.params.id;
    if (model.updateById(id, textbook)) {
        res.redirect('/textbooks/' + id);
    } else {
        let err = new Error("Cannot find a textbook with id " + id);
        err.status = 404;
        err.method
        next(err);
    }
};

// DELETE /textbooks/:id: Delete the textbook listing identified by id
exports.delete = (req, res, next) => {
    if (model.deleteById(req.params.id)) {
        res.redirect("/textbooks");
    } else {
        let err = new Error("Cannot find a textbook with id " + req.params.id);
        err.status = 404;
        next(err);
    }
};