const express = require('express')
const {listContacts, getContactById, addContact} = require("../../models/contacts")

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
  
})

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  const newContact = await addContact(req);
  res.json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
