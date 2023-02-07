const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  itemDescription: String,
  itemQuantity: String,
  isOriginalAvailable: Boolean,
  sizeOfOriginal: String,
  sizeOfOriginalInCm: String,
  arrayOfCopySizes: [{ sizeOfCopy: String }],
  arrayOfCopySizesInCm: [
    {
      sizeOfCopyInCm: String,
    },
  ],
  copyPrice: Number,
  aboutMaterials: String,
  itemColor: [
    {
      color: String,
    },
  ],
  itemCategoryID: String,
  itemCategoryName: String,
  subCategory: String,
  primaryImage: String,
  itemImages: [
    {
      thumbnail: String,
      imageName: String,
      imageUrl: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
