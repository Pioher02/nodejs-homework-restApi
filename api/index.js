const express = require("express");
const router = express.Router();
const signupCtrl = require("../controller/signup");
const loginCtrl = require("../controller/login");
const logoutCtrl = require("../controller/logout");
const createContactCtrl = require("../controller/createContact");
const getContactsCtrl = require("../controller/getContacts");
const getContactByIdCtrl = require("../controller/getContactById");
const validToken = require("../middleware/validToken");
const auth = require("../middleware/auth");

require("dotenv").config();

router.post("/users/signup", signupCtrl);

router.post("/users/login", loginCtrl);

router.post("/users/logout", validToken, auth, logoutCtrl);

router.post("/users/current", validToken, auth, createContactCtrl);

router.get("/users/current", validToken, auth, getContactsCtrl);

router.get("/users/current/:id", validToken, auth, getContactByIdCtrl);

module.exports = router;
