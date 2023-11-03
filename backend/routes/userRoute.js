const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
router.use(bodyParser.json());
const User = require("../models").User;

router.post("/signup", async (req, res) => {
  const { nome, email, password } = req.body;
  try {
    const user = await User.create({ nome, email, password });
    res.send({ user: user });
  } catch (error) {
    res.send(error.errors[0].message);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.send("Email not found!");
    } else {
      if (user && bc.compareSync(password, user.password)) {
        const secret = process.env.SECRET;
        const accessToken = jwt.sign({ UserId: user.id }, secret, {
          expiresIn: "1h",
        });
        res.send({accessToken, user : user});
      } else {
        res.send("Insert a valid password!");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
