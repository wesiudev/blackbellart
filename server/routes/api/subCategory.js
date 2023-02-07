const express = require("express");
const Category = require("../../models/category");
const SubCategory = require("../../models/subCategory");
const Product = require("../../models/product");
const router = express.Router();
const ownerAuth = require("../../middleware/ownerAuth.js");

router.post("/", async (req, res) => {
  try {
    const { category, subCategory, actionType } = req.body;
    const categoryToWorkWith = await Category.findOne({
      categoryName: category,
    });
    if (!category) throw Error("Wybierz kategorię.");
    if (categoryToWorkWith === null)
      throw Error("Taka kategoria nie istnieje.");
    let subCategories;
    switch (actionType) {
      case "ADD":
        if (!subCategory) throw Error("Pole podkategorii nie może być puste.");
        const subCategoryAlreadyExists = categoryToWorkWith.subCategories.find(
          (item) => item.subCategoryName === subCategory
        );
        if (subCategoryAlreadyExists)
          throw Error(
            `Podkategoria ${subCategoryAlreadyExists.subCategoryName} już istnieje.`
          );
        await SubCategory.create({
          subCategoryName: `${subCategory}`,
          relatedCategoryName: `${category}`,
        });
        await Category.updateOne(
          { _id: categoryToWorkWith._id },
          {
            $push: {
              subCategories: {
                subCategoryName: subCategory,
              },
            },
          }
        );

        subCategories = await SubCategory.find({});
        res.status(200).json({
          msg: { id: "SUCCESS", text: "Pomyślnie dodano podkategorię." },
          data: subCategories,
        });
        break;
      case "REMOVE":
        const subCategoryToRemove = await SubCategory.findOne({
          relatedCategoryName: category,
          subCategoryName: subCategory,
        });
        if (!subCategoryToRemove)
          throw Error(`Nie znaleziono podkategorii do usunięcia.`);
        console.log(subCategoryToRemove);
        await SubCategory.findByIdAndRemove(subCategoryToRemove._id);
        const productsToDelete = await Product.find({
          itemSubCategory: subCategoryToRemove._id,
        });
        productsToDelete.map(
          async (product) => await Product.findByIdAndDelete(product._id)
        );
        await Category.updateOne(
          { _id: categoryToWorkWith._id },
          {
            $pull: {
              subCategories: {
                subCategoryName: subCategory,
              },
            },
          }
        );
        subCategories = await SubCategory.find({});
        res.status(200).json({
          msg: { id: "SUCCESS", text: "Podkategoria usunięta." },
          data: { subCategories },
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
    const subCategories = await SubCategory.find({});
    res.status(200).json({ data: subCategories });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
