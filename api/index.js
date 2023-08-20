const express = require("express");
const router = express.Router();
const ctrlContact = require("../controller");

router.get("/contacts", ctrlContact.get);
router.get("/contacts/:id", ctrlContact.getById);
router.post("/contacts", ctrlContact.create);
router.delete("/contacts/:id", ctrlContact.remove);
router.put("/contacts/:id", ctrlContact.update);
router.patch("/contacts/:id", ctrlContact.updateFavorite);

module.exports = router;