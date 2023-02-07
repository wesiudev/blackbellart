const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  userName: { type: String, default: "" },
  password: { type: String, default: "" },
  isAdmin: { type: Boolean, default: true },
});

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
