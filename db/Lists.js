const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: String,
  edited: Boolean,
  userId: String,
});

module.exports = mongoose.model("lists", listSchema);
