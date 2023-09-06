const { removeContact } = require("../service/contact");

const deleteContactCtrl = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    if (result) {
      res.json({
        status: "success delete",
        code: 200,
        data: result,
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
    next(error);
  }
};

module.exports = deleteContactCtrl;
