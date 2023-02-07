const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, default: "" },
  password: { type: String, default: "" },
  address: { type: String, default: "" },
  city: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
