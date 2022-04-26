const express = require("express");
const app = express();
const dotenv = require("dotenv")

dotenv.config()
app.use(express.json());

global["users"] = [];

// import routes

const authRouter = require("./router/auth");
const postRouter = require("./router/post");

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

app.listen(3000, () => console.log("Server stated on port 3000"));
