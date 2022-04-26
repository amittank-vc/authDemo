const jwt = require("jsonwebtoken");

const validation = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    console.log(authHeader);

    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env["JWT_SECRET"]);

    next();
  } catch (err) {
    if (err.message === "invalid token") return res.sendStatus(401);
    res.sendStatus(401);
  }
};

module.exports = validation;
