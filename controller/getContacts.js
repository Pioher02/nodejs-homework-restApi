const { getAllContacts } = require("../service/contact");

const getContactsCtrl = async (req, res, next) => {
  const owner = req.user._id;

  try {
    const result = await getAllContacts({ owner });

    res.status(201).json({
      status: "Success",
      code: 201,
      data: { contacts: result },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = getContactsCtrl;