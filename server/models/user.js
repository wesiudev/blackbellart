const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userEmail: { type: String, default: "" },
  userName: { type: String, default: "" },
  userPictureUrl: { type: String, default: "" },
  orders: [
    {
      orderStatus: String,
    },
  ],
  password: { type: String, default: "" },
  userToken: { type: String, default: "" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
