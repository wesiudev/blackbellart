const express = require("express");
const Product = require("../../models/product");
const Category = require("../../models/category");
const router = express.Router();
const ownerAuth = require("../../middleware/ownerAuth.js");
const SubCategory = require("../../models/subCategory");

router.post("/createProduct", async (req, res) => {
  try {
    const {
      category,
      subCategory,
      itemName,
      itemPrice,
      itemDescription,
      itemQuantity,
      isOriginalAvailable,
      sizeOfOriginal,
      sizeOfOriginalInCm,
      arrayOfCopySizes,
      arrayOfCopySizesInCm,
      copyPrice,
      aboutMaterials,
      itemColor,
      itemImages,
    } = req.body;
    const categoryToWorkWith = await Category.findOne({
      categoryName: category,
    });
    if (categoryToWorkWith === null)
      throw Error(`Brak kategori ${category}...`);
    const id = categoryToWorkWith._id;
    const product = {
      itemName,
      itemPrice,
      itemQuantity,
      isOriginalAvailable,
      itemDescription,
      sizeOfOriginal,
      sizeOfOriginalInCm,
      arrayOfCopySizes,
      arrayOfCopySizesInCm,
      copyPrice,
      aboutMaterials,
      itemColor,
      itemImages,
      itemCategoryID: `${id}`,
      itemCategoryName: `${category}`,
      itemSubCategoryName: `${subCategory}`,
    };
    const newProduct = await Product.create(product);
    if (itemImages.length) {
      const freshImages = newProduct.itemImages.map((image, i) => ({
        _id: image._id,
        index: i,
      }));
      const primaryImage = freshImages.find((image) => image.index === 0);
      await Product.findByIdAndUpdate(
        {
          _id: newProduct._id,
        },
        {
          $set: { primaryImage: primaryImage._id },
        }
      );
    }
    const products = await Product.find({});
    res.status(200).json({
      data: products,
      msg: { id: "SUCCESS", text: "Pomyślnie dodano produkt." },
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/deleteProduct", async (req, res) => {
  try {
    const { productId } = req.body;
    const itemToRemove = await Product.findOne({ productId });
    if (itemToRemove === null)
      throw Error(`Produkt ${productId} nie istnieje.`);
    await Product.findByIdAndDelete(productId);
    const products = await Product.find({});
    res.status(200).json({
      msg: { id: "SUCCESS", text: "Pomyślnie usunięto produkt." },
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/moveProduct", async (req, res) => {
  try {
    const { productId, subCategory, actionType } = req.body;
    const itemToMove = await Product.findOne({ productId });
    if (itemToMove === null) throw Error(`Produkt ${productId} nie istnieje.`);

    switch (actionType) {
      case "moveToSubCategory":
        await Product.updateOne(
          { _id: itemToMove._id },
          { $set: { subCategory: subCategory } }
        );
        break;
      case "removeFromSubCategory":
        await Product.updateOne(
          { _id: itemToMove._id },
          { $set: { itemSubCategoryName: "" } }
        );
        break;
      default:
        break;
    }
    const products = await Product.find({});
    res.status(200).json({
      msg: {
        id: "SUCCESS",
        text: `Pomyślnie dodano produkt do podkategorii ${subCategory}.`,
      },
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/editProduct", async (req, res) => {
  try {
    const { productId, userInput, actionType, thumbnail, imageUrl, imageName } =
      req.body;
    const itemToEdit = await Product.findById(productId);
    if (itemToEdit === null) throw Error(`Produkt ${productId} nie istnieje.`);

    let updatedProduct;

    if (actionType === "itemName") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $set: { itemName: userInput },
        },
        { new: true }
      );
    }
    if (actionType === "itemPrice") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $set: { itemPrice: userInput },
        },
        { new: true }
      );
    }
    if (actionType === "itemQuantity") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $set: { itemQuantity: userInput },
        },
        { new: true }
      );
    }
    if (actionType === "itemDescription") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $set: { itemDescription: userInput },
        },
        { new: true }
      );
    }
    if (actionType === "addSize") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $push: { itemSize: userInput },
        },
        { new: true }
      );
    }
    if (actionType === "addColor") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $push: { itemColor: userInput },
        },
        { new: true }
      );
    }
    if (actionType === "deleteColor") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $pull: { itemColor: { _id: userInput } },
        },
        { new: true }
      );
    }
    if (actionType === "deleteSize") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $pull: { itemSize: { _id: userInput } },
        },
        { new: true }
      );
    }
    if (actionType === "deleteImage") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $pull: { itemImages: { _id: userInput } },
        },
        { new: true }
      );
      if (updatedProduct.itemImages.length) {
        const freshImages = updatedProduct.itemImages.map((image, i) => ({
          _id: image._id,
          index: i,
        }));
        const newPrimaryImage = freshImages.find((image) => image.index === 0);
        updatedProduct = await Product.findByIdAndUpdate(
          {
            _id: updatedProduct._id,
          },
          {
            $set: { primaryImage: newPrimaryImage._id },
          }
        );
      }
    }
    if (actionType === "itemImages") {
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $push: {
            itemImages: {
              thumbnail: thumbnail,
              imageName: imageName,
              imageUrl: imageUrl,
            },
          },
        },
        { new: true }
      );
      if (updatedProduct.itemImages.length) {
        const freshImages = updatedProduct.itemImages.map((image, i) => ({
          _id: image._id,
          index: i,
        }));
        const newPrimaryImage = freshImages.find((image) => image.index === 0);
        updatedProduct = await Product.findByIdAndUpdate(
          {
            _id: updatedProduct._id,
          },
          {
            $set: { primaryImage: newPrimaryImage._id },
          }
        );
      }
    }
    if (actionType === "itemCategoryName") {
      const targettedCategory = await Category.findOne({
        categoryName: userInput,
      });
      if (!targettedCategory) throw Error("Taka kategoria nie istnieje.");
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $set: { itemCategoryName: userInput },
        },
        { new: true }
      );
    }
    if (actionType === "subCategory") {
      const subCategoryToAddItemTo = await SubCategory.findOne({
        subCategoryName: userInput,
      });
      if (!subCategoryToAddItemTo)
        throw Error(`Dodaj podkategorię przed dodaniem do niej produktu.`);
      updatedProduct = await Product.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          $set: { subCategory: userInput },
        },
        { new: true }
      );
    }
    res.status(200).json({
      msg: {
        id: "SUCCESS",
        text: `Pomyślnie edytowano produkt.`,
      },
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/fetchProduct", async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findOne({ _id: productId });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});
router.get("/fetchProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
