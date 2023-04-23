const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const router = express.Router();
const secret = process.env.JWT_SECRET || "test";

router.post("/signin", async (req, res) => {
  const { _id, method, password, userEmail, userName, userPictureUrl } =
    req.body;
  try {
    const existingUser = await User.findOne({ userEmail });
    const token = jwt.sign({ userName: userName, id: _id }, secret, {
      expiresIn: "1h",
    });
    switch (method) {
      case "oAuth":
        if (existingUser) {
          //user exists -> set new token
          const result = await User.findByIdAndUpdate(
            {
              _id: existingUser._id,
            },
            {
              $set: { userToken: token },
            }
          );
          res.status(201).json({
            result,
            token,
            feedback: {
              message: `Pomyślnie zalogowano użytkownika ${userEmail}.`,
              id: "USER",
            },
          });
        } else {
          //!user -> create a new instance
          const password = await bcrypt.hash(_id, 12);
          const result = await User.create({
            userEmail: userEmail,
            userName: userName,
            password: password,
            userPictureUrl: userPictureUrl,
            userToken: token,
          });
          res.status(201).json({
            result,
            token,
            feedback: {
              message: `Pomyślnie zalogowano użytkownika ${userEmail}.`,
              id: "USER",
            },
          });
        }
        break;
      case "manual":
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  const { userEmail, password, userName } = req.body;

  try {
    const existingUser = await User.findOne({ userEmail });

    if (existingUser)
      throw Error("Istnieje już konto z podanym adresem e-mail.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      userEmail: userEmail,
      userName: userName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userName: result.userName, id: result._id },
      secret,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});
router.post("/fetchUser", async (req, res) => {
  try {
    const { token } = req.body;
    const result = await User.findOne({ userToken: token });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
