const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller");

router.get("/contacts", ctrlContact.get);
router.get("/contacts/:id", ctrlContact.getById);

module.exports = router;