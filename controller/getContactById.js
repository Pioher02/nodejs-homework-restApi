const { getContactById } = require("../service/contact");

const getContactByIdCtrl = async (req, res, next) => {
    const { id } = req.params;
    try {
      const results = await getContactById(id);
      if (results) {
        res.json({
          status: "success",
          code: 200,
          data: results,
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Contact not found by id ${id}`,
          data: "Not found",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  module.exports = getContactByIdCtrl;