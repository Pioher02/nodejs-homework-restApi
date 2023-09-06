const jwt = require("jsonwebtoken");
const { getUserByEmail, updateUserToken } = require("../service/user");
const secret = process.env.SECRET;

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: "Email or password is missing",
    });
  }

  const user = await getUserByEmail(email);

  if (!user || !user.validPassword(password)) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  }

  try {
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    const userUpdate = await updateToken(user.id, token);

    res.status(200).json({
      status: "Ok",
      code: 200,
      data: {
        token: token,
        user: {
          username: userUpdate.username,
          email: userUpdate.email,
          subscription: userUpdate.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateToken = async (id, token) => {
  return updateUserToken({ id, token });
};

module.exports = loginCtrl;
