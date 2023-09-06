const { updateContact } = require("../service/contact");
const Joi = require("joi");

const updateContactCtrl = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  
  if (
    name === undefined &&
    email === undefined &&
    phone === undefined &&
    favorite === undefined
  ) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer().min(7),
      favorite: Joi.boolean(),
    });

    const { error, value } = schema.validate({ name, email, phone, favorite });

    if (error !== undefined) {
      res.status(400).json(error.message);
    } else {
      try {
        const result = await updateContact(id, value);
        if (result) {
          res.json({
            status: "success update",
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
        console.log(error);
        next(error);
      }
    }
  }
};

module.exports = updateContactCtrl;
