const express = require("express");
const Category = require("../../models/category");
const Product = require("../../models/product");
const router = express.Router();
const ownerAuth = require("../../middleware/ownerAuth.js");
const SubCategory = require("../../models/subCategory");

router.post("/", async (req, res) => {
  try {
    const { category, actionType } = req.body;
    if (category === "") throw Error("Pole kategorii nie może być puste.");
    let categories;
    switch (actionType) {
      case "ADD":
        const categoryAlreadyExists = await Category.findOne({
          categoryName: category,
        });
        if (JSON.stringify(categoryAlreadyExists).length > 5)
          throw Error(`Kategoria ${category} już istnieje.`);
        await Category.create({
          categoryName: `${category}`,
        });
        categories = await Category.find({});
        res.status(200).json({
          msg: { id: "SUCCESS", text: "Pomyślnie dodano kategorię." },
          data: categories,
        });
        break;
      case "REMOVE":
        const categoryToRemove = await Category.findOne({
          categoryName: category,
        });
        await Category.findByIdAndRemove(categoryToRemove._id);

        const subCategoriesToRemove = await SubCategory.find({
          relatedCategoryName: category,
        });

        subCategoriesToRemove.map(
          async (subCategory) =>
            await SubCategory.findByIdAndDelete(subCategory._id)
        );

        const productsToDelete = await Product.find({
          itemCategory: categoryToRemove._id,
        });
        productsToDelete.map(
          async (product) => await Product.findByIdAndDelete(product._id)
        );
        categories = await Category.find({});
        res.status(200).json({
          msg: { id: "SUCCESS", text: "Kategoria usunięta." },
          data: categories,
        });
        break;
      default:
        break;
    }
    res.status(200);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
