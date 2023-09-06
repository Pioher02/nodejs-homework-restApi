const { addContact } = require("../service/contact");
const Joi = require("joi");

const createContactCtrl = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const owner = req.user._id;

  if (name === undefined || email === undefined || phone === undefined) {
    res.status(400).json({ message: "missing required field" });
  } else {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer().min(7).required(),
      favorite: Joi.boolean(),
      owner: Joi.object({}).required(),
    });

    const { error, value } = schema.validate({
      name,
      email,
      phone,
      favorite,
      owner,
    });

    if (error !== undefined) {
      res.status(400).json(error.message);
    } else {
      try {
        const result = await addContact(value);

        res.status(201).json({
          status: "success",
          code: 201,
          data: result,
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  }
};

module.exports = createContactCtrl;
