const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/api/user.js");
const ownerRoutes = require("./routes/api/owner.js");
const categoryRoutes = require("./routes/api/category.js");
const subCategoryRoutes = require("./routes/api/subCategory.js");
const productRoutes = require("./routes/api/product.js");
const cartRoutes = require("./routes/api/cart.js");

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();

const db = process.env.MONGO_URI;

app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subCategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server started on PORT ${port}`);
});

module.exports = app;
