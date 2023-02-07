const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  products: [],
  cartID: String,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
