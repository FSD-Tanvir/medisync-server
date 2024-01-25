const express = require("express");
const router = express.Router();
const newsAndArticlesController = require("../controllers/newsAndArticlesController");

// get all products item

router.get("/", newsAndArticlesController.getAllNesAndArticles);
router.get("/single/:id", newsAndArticlesController.getNesAndArticleById);

module.exports = router;
