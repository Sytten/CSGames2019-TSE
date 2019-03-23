import mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  leadParagraph: String,
  imageUrl: String,
  body: String,
  author: String,
  userId: { type: "ObjectId", ref: "Account" },
  date: { type: Date, default: Date.now },
  category: String,
});

export default mongoose.model("Article", articleSchema);
