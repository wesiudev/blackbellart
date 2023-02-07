const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  subCategoryName: String,
  relatedCategoryName: String,
  relatedCategoryID: String,
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
