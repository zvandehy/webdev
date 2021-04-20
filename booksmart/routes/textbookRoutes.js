const express = require('express');
const controller = require("../controllers/textbookController.js");
const { isLoggedIn, isOwner } = require("../middlewares/auth");
const router = express.Router();

// GET /textbooks: send all textbooks to the user
router.get("/", controller.index);

// GET /textbooks/new: send the form to create a new textbook listing
router.get("/new", isLoggedIn, controller.new);

// POST /textbooks
router.post("/", isLoggedIn, controller.create);

// GET /textbooks/:id
router.get("/:id", controller.show);

// GET /textbooks/:id/edit
router.get("/:id/edit", isOwner, controller.edit);

// PUT /textbooks/:id: Update the textbook identified by id
router.put("/:id", isOwner, controller.update);

// DELETE /textbooks/:id: Delete the textbook listing identified by id
router.delete("/:id", isOwner, controller.delete);

module.exports = router;