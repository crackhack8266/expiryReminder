const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  //here we will save the searched user details (if we found one from the db) in the const user variable
  const user = await User.findOne({ email: email }); //findOne method is going to take an object as argument. here we wnt to find user using email so we will pass email property in the object
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token: token });
  } catch (e) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;