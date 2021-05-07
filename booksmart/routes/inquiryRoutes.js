const express = require('express');
const controller = require("../controllers/inquiryController.js");
const { isLoggedIn, isInquiredByOrOwner, isNotOwner, inquiryAlreadyExists } = require("../middlewares/auth");
const { validateTextbookId, validateId, validateInquiry, validateResult } = require('../middlewares/validator');
const { logInLimiter } = require('../middlewares/rateLimiters');
const router = express.Router();

// GET /inquiries: redirect to the users profile
router.get("/", (req, res) => { res.redirect("/users/profile") });

// GET /inquiries/new: redirect to 
router.get("/new", (req, res) => { req.flash("error", "Look for an available textbook to inquire about"), res.redirect("/textbooks") });

// POST /inquiries
router.post("/", isLoggedIn, validateTextbookId, validateInquiry, isNotOwner, inquiryAlreadyExists, validateResult, controller.create);
// GET /inquiries/:id
router.get("/:id", isLoggedIn, validateId, isInquiredByOrOwner, controller.show);

// PUT /inquiries/:id: Update (send message to) the inquiry identified by id
router.put("/:id", isLoggedIn, validateId, isInquiredByOrOwner, validateInquiry, validateResult, controller.update);
// PUT /inquiries/:id: Update the sale confirmation status for the inquiry identified by id
router.put("/:id/confirm", isLoggedIn, validateId, isInquiredByOrOwner, controller.confirm);

// DELETE /textbooks/:id: Delete the textbook listing identified by id
router.delete("/:id", isLoggedIn, validateId, isInquiredByOrOwner, controller.delete);

module.exports = router;



