const express = require("express");
const router = express.Router();
const newsAndArticlesController = require("../controlers/newsAndArticlesController");

// get all products item

router.get("/", newsAndArticlesController.getAllNesAndArticles);

module.exports = router;
