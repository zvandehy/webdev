const express = require('express');
const controller = require("../controllers/textbookController.js");
const { isLoggedIn, isOwner } = require("../middlewares/auth");
const { validateId, validateTextbook, validateResult } = require('../middlewares/validator');
const router = express.Router();

// GET /textbooks: send all textbooks to the user
router.get("/", controller.index);

// GET /textbooks/new: send the form to create a new textbook listing
router.get("/new", isLoggedIn, controller.new);

// POST /textbooks
router.post("/", isLoggedIn, validateTextbook, validateResult, controller.create);

// GET /textbooks/:id
router.get("/:id", validateId, controller.show);

// GET /textbooks/:id/edit
router.get("/:id/edit", validateId, isLoggedIn, isOwner, validateResult, controller.edit);

// PUT /textbooks/:id: Update the textbook identified by id
router.put("/:id", validateId, isLoggedIn, isOwner, validateTextbook, validateResult, controller.update);

// DELETE /textbooks/:id: Delete the textbook listing identified by id
router.delete("/:id", validateId, isLoggedIn, isOwner, validateResult, controller.delete);

module.exports = router;