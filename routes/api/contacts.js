const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (name === undefined || email === undefined || phone === undefined) {
    res.status(400).json({ message: "missing required field" });
  } else {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer().min(7).required(),
    });

    const { error, value } = schema.validate({ name, email, phone });

    if (error !== undefined) {
      res.status(400).json(error.message);
    } else {
      const newContact = await addContact(value);
      res.status(201).json(newContact);
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const stateDelete = await removeContact(req.params.contactId);

  if (stateDelete === 200) {
    res.status(stateDelete).json({ mensaje: "contacto eliminado" });
  } else {
    res.status(stateDelete).json({ mensaje: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
