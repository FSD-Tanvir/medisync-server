const NewsAndArticles = require("../models/NewsAndArticles");

const getAllNesAndArticles = async (req, res) => {
  try {
    const newsAndArticles = await NewsAndArticles.find();
    res.status(200).json(newsAndArticles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getNesAndArticleById = async (req, res) => {
  try {
    const newsAndArticles = await NewsAndArticles.findOne({
      _id: req.params.id,
    });
    res.status(200).json(newsAndArticles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNesAndArticles,
  getNesAndArticleById,
};
