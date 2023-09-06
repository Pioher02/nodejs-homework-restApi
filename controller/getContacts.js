const { getAllContacts } = require("../service/contact");
const { getUserById } = require("../service/user");

const getContactsCtrl = async (req, res, next) => {
  const owner = req.user._id;

  try {
    const user = await getUserById({ owner });
    const result = await getAllContacts({ owner });

    res.status(201).json({
      status: "Success",
      code: 201,
      data: {
        user: {
          username: user.username,
          email: user.email,
          subscription: user.subscription,
        },
        contacts: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getContactsCtrl;
