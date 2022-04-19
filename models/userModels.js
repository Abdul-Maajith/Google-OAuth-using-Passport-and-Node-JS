const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");

const userSchema = new Schema({
  username: String,
  googleId: String,
  email: mongoose.SchemaTypes.Email,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;