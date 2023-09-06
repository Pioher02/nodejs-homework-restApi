const Contact = require("../schemas/contacts");

const getAllContacts = async ({ owner }) => {
  return Contact.find({ owner });
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = async ({ name, email, phone, favorite, owner }) => {
  return Contact.create({ name, email, phone, favorite, owner });
};

module.exports = { getAllContacts, getContactById, addContact };
