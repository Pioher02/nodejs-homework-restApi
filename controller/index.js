const service = require("../service");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    console.log(results);
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { get };
