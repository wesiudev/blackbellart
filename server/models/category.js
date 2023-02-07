const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: String,
  subCategories: [
    {
      subCategoryName: String,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
