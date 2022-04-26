const bcrypt = require("bcryptjs");

const registerValidation = (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    typeof name !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string"
  )
    return res.status(400).send("Invalid Parameters");

  const userExist = global["users"].find((e) => e.email === email);

  if (userExist) return res.status(403).send("user already exists");

  next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    typeof password !== "string" ||
    typeof email !== "string"
  )
    return res.status(400).send("Invalid Parameters");

  const user = global["users"].find((e) => e.email === email);

  if (!user) return res.status(403).send("email id or password incorrect");

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) return res.status(403).send("invalid password");

  console.log({ user });
  req["users"] = user;

  next();
};

module.exports = { registerValidation, loginValidation };
