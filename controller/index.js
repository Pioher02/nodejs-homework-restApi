const service = require("../service");
const Joi = require("joi");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
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

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await service.getContactById(id);
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

const create = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;

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
    });

    const { error, value } = schema.validate({ name, email, phone, favorite });

    if (error !== undefined) {
      res.status(400).json(error.message);
    } else {
      try {
        const result = await service.addContact(value);

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

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(id);
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
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;

  if (name === undefined && email === undefined && phone === undefined && favorite === undefined) {
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
        const result = await service.updateContact(id, value);
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

const updateFavorite = async (req, res, next) => {
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
        const result = await service.updateStatusContact(id, value);
        if (result) {
          res.status(200).json({
            status: "success update status",
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
module.exports = { get, getById, create, remove, update, updateFavorite };
