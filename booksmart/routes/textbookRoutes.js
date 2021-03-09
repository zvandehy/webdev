const express = require('express');
const controller = require("../controllers/textbookController.js");
const router = express.Router();

// GET /stories: send all stories to the user
router.get("/", controller.index);

// GET /stories/new: send the form to create a new story
router.get("/new", controller.new);

// // POST /stories
// router.post("/", controller.create);

// // GET /stories/:id
// router.get("/:id", controller.show);

// // GET /stories/:id/edit
// router.get("/:id/edit", controller.edit);

// // PUT /stories/:id: Update the story identified by id
// router.put("/:id", controller.update);

// // DELETE /stories/:id: Delete the story identified by id
// router.delete("/:id", controller.delete);

module.exports = router;