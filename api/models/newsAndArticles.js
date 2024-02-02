const mongoose = require("mongoose");
const { Schema } = mongoose;

// create schema object for productItems

const newsAndArticlesSchema = new Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  date: String,
});

const NewsAndArticles = mongoose.model(
  "NewsAndArticles",
  newsAndArticlesSchema
);
module.exports = NewsAndArticles;
