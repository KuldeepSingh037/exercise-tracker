const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });
  try {
    newUser
      .save()
      .then(() => res.send("User added !"))
      .catch((err) => res.status(400).json("Error+ " + err));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
