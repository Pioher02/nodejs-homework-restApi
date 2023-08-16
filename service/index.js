const Contact = require("./schemas/contacts");

const getAllContacts = async () => {
  console.log("se está ejecutando");
  return Contact.find();
};

module.exports = { getAllContacts };

