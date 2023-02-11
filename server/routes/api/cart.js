const express = require("express");
const Product = require("../../models/product");
const Cart = require("../../models/cart");
const router = express.Router();
const auth = require("../../middleware/auth.js");

router.post("/addProductToCart", async (req, res) => {
  try {
    const { cartID, productID, size, quantity, isOriginal } = req.body;

    const existingCart = cartID !== undefined;
    const product = {
      productID,
      size,
      quantity,
      isOriginal,
    };
    if (existingCart) {
      const cart = await Cart.findByIdAndUpdate(
        {
          _id: cartID,
        },
        {
          $push: { products: product },
        },
        { new: true }
      );
      res.status(200).json({
        cart: cart,
        msg: { id: "SUCCESS", text: "W koszyku znajduje się nowy produkt." },
      });
    } else {
      const newCart = await Cart.create({
        products: [],
      });
      const cart = await Cart.findByIdAndUpdate(
        {
          _id: newCart._id,
        },
        {
          $push: { products: product },
        },
        { new: true }
      );
      res.status(200).json({
        cart: cart,
        msg: { id: "SUCCESS", text: "W koszyku znajduje się nowy produkt." },
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/fetchCart", async (req, res) => {
  try {
    const { cartID } = req.body;
    const cart = await Cart.findById(cartID);
    if (!cart) throw Error("Twój koszyk wygasł.");
    res.status(200).json({
      cart: cart,
      msg: { id: "SUCCESS", text: "Pomyślnie wczytano produkty." },
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.delete("/deleteProduct", async (req, res) => {
  try {
    const { cartID, productID } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      {
        _id: cartID,
      },
      {
        $pull: { products: productID },
      },
      { new: true }
    );
    res.status(200).json({
      cart: cart,
      msg: { id: "SUCCESS", text: "Produkt został usunięty z koszyka." },
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

// router.post("/moveProduct", async (req, res) => {
//   try {
//     const { productId, subCategory, actionType } = req.body;
//     const itemToMove = await Product.findOne({ productId });
//     if (itemToMove === null) throw Error(`Produkt ${productId} nie istnieje.`);

//     switch (actionType) {
//       case "moveToSubCategory":
//         await Product.updateOne(
//           { _id: itemToMove._id },
//           { $set: { subCategory: subCategory } }
//         );
//         break;
//       case "removeFromSubCategory":
//         await Product.updateOne(
//           { _id: itemToMove._id },
//           { $set: { itemSubCategoryName: "" } }
//         );
//         break;
//       default:
//         break;
//     }
//     const products = await Product.find({});
//     res.status(200).json({
//       msg: {
//         id: "SUCCESS",
//         text: `Pomyślnie dodano produkt do podkategorii ${subCategory}.`,
//       },
//       data: products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// router.post("/editProduct", async (req, res) => {
//   try {
//     const { productId, userInput, actionType, thumbnail, imageUrl, imageName } =
//       req.body;
//     const itemToEdit = await Product.findById(productId);
//     if (itemToEdit === null) throw Error(`Produkt ${productId} nie istnieje.`);

//     let updatedProduct;

//     if (actionType === "itemName") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $set: { itemName: userInput },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "itemPrice") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $set: { itemPrice: userInput },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "itemQuantity") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $set: { itemQuantity: userInput },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "itemDescription") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $set: { itemDescription: userInput },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "addSize") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $push: { itemSize: userInput },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "addColor") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $push: { itemColor: userInput },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "deleteColor") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $pull: { itemColor: { _id: userInput } },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "deleteSize") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $pull: { itemSize: { _id: userInput } },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "deleteImage") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $pull: { itemImages: { _id: userInput } },
//         },
//         { new: true }
//       );
//       if (updatedProduct.itemImages.length) {
//         const freshImages = updatedProduct.itemImages.map((image, i) => ({
//           _id: image._id,
//           index: i,
//         }));
//         const newPrimaryImage = freshImages.find((image) => image.index === 0);
//         updatedProduct = await Product.findByIdAndUpdate(
//           {
//             _id: updatedProduct._id,
//           },
//           {
//             $set: { primaryImage: newPrimaryImage._id },
//           }
//         );
//       }
//     }
//     if (actionType === "itemImages") {
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $push: {
//             itemImages: {
//               thumbnail: thumbnail,
//               imageName: imageName,
//               imageUrl: imageUrl,
//             },
//           },
//         },
//         { new: true }
//       );
//       if (updatedProduct.itemImages.length) {
//         const freshImages = updatedProduct.itemImages.map((image, i) => ({
//           _id: image._id,
//           index: i,
//         }));
//         const newPrimaryImage = freshImages.find((image) => image.index === 0);
//         updatedProduct = await Product.findByIdAndUpdate(
//           {
//             _id: updatedProduct._id,
//           },
//           {
//             $set: { primaryImage: newPrimaryImage._id },
//           }
//         );
//       }
//     }
//     if (actionType === "itemCategoryName") {
//       const targettedCategory = await Category.findOne({
//         categoryName: userInput,
//       });
//       if (!targettedCategory) throw Error("Taka kategoria nie istnieje.");
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $set: { itemCategoryName: userInput },
//         },
//         { new: true }
//       );
//     }
//     if (actionType === "subCategory") {
//       const subCategoryToAddItemTo = await SubCategory.findOne({
//         subCategoryName: userInput,
//       });
//       if (!subCategoryToAddItemTo)
//         throw Error(`Dodaj podkategorię przed dodaniem do niej produktu.`);
//       updatedProduct = await Product.findByIdAndUpdate(
//         {
//           _id: productId,
//         },
//         {
//           $set: { subCategory: userInput },
//         },
//         { new: true }
//       );
//     }
//     res.status(200).json({
//       msg: {
//         id: "SUCCESS",
//         text: `Pomyślnie edytowano produkt.`,
//       },
//       updatedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

// router.post("/fetchProduct", async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await Product.findOne({ _id: productId });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({
//       msg: error.message,
//     });
//   }
// });
// router.get("/fetchProducts", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json({ data: products });
//   } catch (error) {
//     res.status(500).json({
//       msg: error.message,
//     });
//   }
// });

module.exports = router;
