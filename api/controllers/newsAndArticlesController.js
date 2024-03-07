const NewsAndArticles = require("../models/newsAndArticles");

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

const addAnArticle = async (req, res) => {
  const newArticle = new NewsAndArticles(req.body);
  const result = await newArticle.save();
  res.send(result);
};

const deleteArticle = async (req, res) => {
  const id = req.params.id;
  const result = await NewsAndArticles.deleteOne({ _id: id });
  res.send(result);
};

const updateArticle = async (req, res) => {
  const updateInfo = req.body;

  const result = await NewsAndArticles.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: updateInfo?.title,
        description: updateInfo?.description,
        image: updateInfo?.image,
        date: updateInfo?.date,
      },
    },
    { new: true }
  );

  res.send(result);
};

module.exports = {
  getAllNesAndArticles,
  getNesAndArticleById,
  addAnArticle,
  deleteArticle,
  updateArticle,
};
