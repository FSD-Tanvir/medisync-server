const express = require("express");
const router = express.Router();
const newsAndArticlesController = require("../controllers/newsAndArticlesController");

// get all products item

router.get("/", newsAndArticlesController.getAllNesAndArticles);
router.get("/single/:id", newsAndArticlesController.getNesAndArticleById);
router.post("/", newsAndArticlesController.addAnArticle);
router.delete(
  "/newAndArticles/deleteArticle/:id",
  newsAndArticlesController.deleteArticle
);
router.patch(
  "/newsAndArticle/update/:id",
  newsAndArticlesController.updateArticle
);

module.exports = router;
