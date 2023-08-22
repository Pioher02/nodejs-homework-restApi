const invalidateTokens = [];

const logoutCtrl = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  invalidateTokens.push(token);
  res.status(204).send();
};

module.exports = logoutCtrl;
