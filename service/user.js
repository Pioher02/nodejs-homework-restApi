const User = require("../schemas/user");

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserToken = async ({id, token}) => {
    return User.findByIdAndUpdate({ _id: id }, { token: token });
}

module.exports = { getUserByEmail, updateUserToken };
