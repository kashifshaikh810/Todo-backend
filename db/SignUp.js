const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("register", signUpSchema);
