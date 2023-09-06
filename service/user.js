const User = require("../schemas/user");

const getUserById = async (id) => {
  return User.findOne(id.owner);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserToken = async ({id, token}) => {
    return User.findByIdAndUpdate({ _id: id }, { token: token });
}

module.exports = { getUserById, getUserByEmail, updateUserToken };
