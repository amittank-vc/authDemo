const router = require("express").Router();

const auth = require("../validation/tokenValidation");

router.get("/", auth, (req, res) => {
  res.status(200).send([
    {
      title: "post one",
      description: "this is post one",
    },
    {
      title: "post two",
      description: "this is post two",
    },
  ]);
});

module.exports = router;
