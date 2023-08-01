const fs = require("fs/promises");
const nanoid = require("nanoid");

const listContacts = async () => {
  const contactList = await fs.readFile("models/contacts.json");
  return JSON.parse(contactList);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const addContact = async (body) => {
  body.id = nanoid();
  const contacts = await listContacts();
  contacts.push(body);
  await fs.writeFile("models/contacts.json", JSON.stringify(contacts));
  return body;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredList = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile("models/contacts.json", JSON.stringify(filteredList));
  if (contacts.length === filteredList.length) {
    var state = 404;
  } else {
    state = 200;
  }
  return state;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
