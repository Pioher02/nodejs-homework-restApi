const { updateStatusContact } = require("../service/contact");
const Joi = require("joi");

const updateStatusContactCtrl = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    res.status(400).json({ message: "missing field favorite" });
  } else {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const { error, value } = schema.validate({ favorite });

    if (error !== undefined) {
      res.status(400).json(error.message);
    } else {
      try {
        const result = await updateStatusContact(id, value);
        if (result) {
          res.status(200).json({
            status: "success update status",
            code: 200,
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
    }
  }
};

module.exports = updateStatusContactCtrl;
