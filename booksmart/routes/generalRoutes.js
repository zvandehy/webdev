const express = require('express');
const controller = require("../controllers/generalController.js");
const router = express.Router();

// GET /index: home page
router.get("/", controller.home);

// GET /about: information about the site
router.get("/about", controller.about);

// GET /contact: contact information
router.get("/contact", controller.contact);

module.exports = router;