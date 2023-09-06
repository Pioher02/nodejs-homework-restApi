const { updateUserToken } = require("../service/user");

const logoutCtrl = async (req, res, next) => {
  const { id } = req.user;
  await updateUserToken({ id, token: null });
  res.status(204).send();
};

module.exports = logoutCtrl;
