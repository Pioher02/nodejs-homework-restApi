const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const User = require("../schemas/user");

const validToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  try {
    const verify = jwt.verify(token, secret);
    const id = verify.id;
    const user = await User.findOne({ _id: id });
    
    if (user || token === user.token) {
      req.user = user;
      next();
    }
  } catch {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = validToken;
