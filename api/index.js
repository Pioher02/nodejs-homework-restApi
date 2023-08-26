const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const auth = require("../middleware/auth");
const signupCtrl = require("../controller/signup");
const loginCtrl = require("../controller/login");
const validToken = require("../middleware/validToken");
require("dotenv").config();

router.post("/users/signup", signupCtrl);

router.post("/users/login", loginCtrl);

router.post("/users/logout", validToken, auth, async (req, res, next) => {
  
  const { id } = req.user;
  await User.findByIdAndUpdate({ _id: id }, { token: null });
  res.status(204).send();
});

module.exports = router;
