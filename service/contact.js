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

const removeContact = async (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const updateStatusContact = async (id, favorite) => {
  return Contact.findByIdAndUpdate({ _id: id }, favorite);
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
