const express = require('express');
const controller = require("../controllers/textbookController.js");
const router = express.Router();

// GET /textbooks: send all textbooks to the user
router.get("/", controller.index);

// GET /textbooks/new: send the form to create a new textbook listing
router.get("/new", controller.new);

// POST /textbooks
router.post("/", controller.create);

// GET /textbooks/:id
router.get("/:id", controller.show);

// GET /textbooks/:id/edit
router.get("/:id/edit", controller.edit);

// PUT /textbooks/:id: Update the textbook identified by id
router.put("/:id", controller.update);

// DELETE /textbooks/:id: Delete the textbook listing identified by id
router.delete("/:id", controller.delete);

module.exports = router;