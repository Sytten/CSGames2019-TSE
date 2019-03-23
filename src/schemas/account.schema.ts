import mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

export default mongoose.model("AccountModel", accountSchema);
