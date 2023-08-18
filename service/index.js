const Contact = require("./schemas/contacts");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({_id:id});
};

const addContact = async ({name, email, phone, favorite}) => {
  return Contact.create({name, email, phone, favorite});
};

const removeContact = async (id) => {
  return Contact.findByIdAndRemove({_id:id});
};

const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({_id:id}, fields, {new: true});
}



module.exports = { getAllContacts, getContactById, addContact, removeContact, updateContact };

