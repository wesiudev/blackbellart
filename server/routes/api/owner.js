const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Owner = require("../../models/owner");
const router = express.Router();
const secret = process.env.JWT_OWNER_SECRET || "owner";

router.post("/signin", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const oldUser = await Owner.findOne({ userName });

    if (!oldUser) throw Error("Użytkownik o takim adresie e-mail nie istnieje");

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      throw Error("Podano błędny adres e-mail lub hasło.");

    if (!password) throw Error("Błąd logowania");

    const token = jwt.sign(
      { userName: oldUser.userName, id: oldUser._id },
      secret,
      {
        expiresIn: "168h",
      }
    );

    res.status(200).json({
      result: oldUser,
      token,
      msg: "Logowanie zakończyło się sukcesem.",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
