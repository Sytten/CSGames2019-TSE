import mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

export default mongoose.model("Account", accountSchema);
