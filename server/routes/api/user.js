const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Owner = require("../../models/owner");
const router = express.Router();
const secret = process.env.JWT_SECRET || "test";

router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const oldUser = await User.findOne({ userName });

    if (!oldUser) throw Error("Użytkownik o takim adresie e-mail nie istnieje");

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      throw Error("Podano błędny adres e-mail lub hasło.");

    const token = jwt.sign(
      { userName: oldUser.userName, id: oldUser._id },
      secret,
      {
        expiresIn: "1h",
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

router.post("/signup", async (req, res) => {
  const { password, userName } = req.body;

  try {
    const oldUser = await User.findOne({ userName });

    if (oldUser) throw Error("Istnieje już konto z podanym adresem e-mail.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      userName: `${userName}`,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userName: result.userName, id: result._id },
      secret,
      {
        expiresIn: "1h",
      }
    );
    console.log(result);
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
