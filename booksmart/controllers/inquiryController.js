const Inquiry = require('../models/inquiry.js');
const Message = require('../models/message.js');
const User = require('../models/user.js');
const Textbook = require('../models/textbook.js');


// POST /inquiries
exports.create = (req, res, next) => {
    let inquiry = new Inquiry(req.body);
    inquiry.inquiredBy = req.session.user;
    //if document not found then make the inquiry
    // save inquiry in DB
    inquiry.save()
        .then(iq => {
            //save message in DB
            let message = new Message(req.body);
            message.inquiry = iq;
            message.sender = req.session.user;
            message.save()
                .then(m => {
                    req.flash("success", "Successfully inquired about the textbook!")
                    res.redirect('/inquiries/' + inquiry._id);
                })
                .catch(err => {
                    if (err.name === "ValidationError") {
                        req.flash('error', err.message);
                        res.redirect("back");
                    }
                });
        })
        .catch(err => {
            if (err.name === "ValidationError") {
                req.flash('error', err.message);
                res.redirect("back");
            }
        });
};

// GET /inquiries/:id
exports.show = (req, res, next) => {
    let id = req.params.id;

    Inquiry.findById(id).populate("textbook")
        .then(inquiry => {
            if (inquiry) {
                Promise.all([Message.find({ inquiry: inquiry._id }).populate("sender")])
                    .then(results => {
                        const [msgs] = results;
                        res.render("./inquiry/show", { inquiry: inquiry, messages: msgs });
                    })
                    .catch(err => next(err))

            } else {
                let err = new Error("Cannot find a inquiry with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// PUT /inquiries/:id --> Reply to the inquiry
exports.update = (req, res, next) => {

    // update this textbook in DB
    let id = req.params.id;

    //save message in DB
    let message = new Message(req.body);
    message.inquiry = id;
    message.sender = req.session.user;
    message.save()
        .then(m => {
            req.flash("success", "Successfully replied to the inquiry")
            res.redirect('/inquiries/' + id);
        })
        .catch(err => {
            if (err.name === "ValidationError") {
                req.flash('error', err.message);
                res.redirect("back");
            }
        });
};

// DELETE /inquiries/:id: Delete the inquiry identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;

    Inquiry.findByIdAndDelete(id, { useFindAndModify: false })
        .then(inquiry => {
            if (inquiry) {
                req.flash("success", "Successfully deleted the inquiry!")
                res.redirect('/users/profile');
            } else {
                let err = new Error("Cannot find a inquiry with id " + req.params.id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

//PUT /inquiries/:id/confirm: Update the status of the inquiry (sale)
exports.confirm = (req, res, next) => {
    let id = req.params.id;

    Inquiry.findById(id, { useFindAndModify: false }).populate("textbook")
        .then(inquiry => {
            if (inquiry) {

                //is owner
                if (inquiry.textbook.owner == req.session.user) {
                    if (inquiry.status == "pending_owner") {
                        inquiry.status = "confirmed";
                    } else if (inquiry.status == "pending") {
                        inquiry.status = "pending_inquirer";
                    } else {
                        req.flash("error", "You have already confirmed this sale.");
                        res.redirect("/users/profile");
                    }
                }
                //is inquirer
                if (inquiry.inquiredBy == req.session.user) {
                    if (inquiry.status == "pending_inquirer") {
                        inquiry.status = "confirmed";
                    } else if (inquiry.status == "pending") {
                        inquiry.status = "pending_owner";
                    } else {
                        req.flash("error", "You have already confirmed this sale.");
                        res.redirect("/users/profile");
                    }
                }

                if (inquiry.status == "confirmed") {
                    //delete all messages associated with the sold textbook (in any inquiry)
                    Inquiry.find({ textbook: inquiry.textbook })
                        .then(inquiries => {
                            inquiries.forEach(inquiry => {
                                Message.deleteMany({ inquiry: inquiry._id })
                                    .then(done => { })
                                    .catch(err => next(err));
                            })
                        })
                        .then(done => {
                            Promise.all(
                                [
                                    Textbook.findByIdAndUpdate(inquiry.textbook, { status: "sold" }),
                                    User.findByIdAndUpdate(inquiry.inquiredBy, { $push: { "bought": inquiry.textbook }, $inc: { "exchanges": 1 } }),
                                    User.findByIdAndUpdate(inquiry.textbook.owner, { $inc: { "exchanges": 1 } }),
                                    Inquiry.deleteMany({ textbook: inquiry.textbook })
                                ]).then(results => {
                                    req.flash("success", "You have confirmed the sale");
                                    res.redirect("/users/profile");
                                }).catch(err => next(err));
                        })
                        .catch(err => next(err))

                } else {
                    inquiry.save()
                        .then(saved => {
                            req.flash("success", "You have confirmed the sale. Waiting for the other user to confirm.");
                            res.redirect("/users/profile");
                        })
                        .catch(err => next(err));
                }
            } else {
                let err = new Error("Cannot find a inquiry with id " + req.params.id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};