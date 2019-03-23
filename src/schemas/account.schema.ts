import mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String
});

export default mongoose.model('AccountModel', AccountSchema);
