const User = require("../schemas/user");

const signupCtrl = async (req, res, next) => {
  const { username, email, password, subscription, token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "Conflict",
      code: 409,
      message: "Email is already in use",
    });
  }
  try {
    const newUser = new User({ username, email, subscription });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      status: "Created",
      code: 201,
      data: {
        user: {
          username: newUser.username,
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signupCtrl;
