const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation/auth");

router.post("/register", registerValidation, (req, res) => {
  const { name, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  global["users"].push({ name, email, password: hashPassword });
  res.status(200).send({ name, email });
});

router.post("/login", loginValidation, (req, res) => {
  const { email, name } = req["users"];

  const token = jwt.sign({ email, name }, process.env.JWT_SECRET);
  res.status(200).send({ token });
});

module.exports = router;
