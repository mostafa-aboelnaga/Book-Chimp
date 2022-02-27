const Joi = require("@hapi/joi")

const registerValidation = (data) => {
  const validRegisterSchema = Joi.object({
    name: Joi.string().required().min(6),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  })
  return validRegisterSchema.validate(data)
}

const loginValidation = (data) => {
  const validLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  })
  return validLoginSchema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
