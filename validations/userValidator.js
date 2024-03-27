const Joi = require("joi")

const userValidator = (data) => {
  const rule = Joi.object({
    name: Joi.string().min(6).max(255),
    email: Joi.string().min(6).max(255).email(),
    phone: Joi.string()
      .min(10)
      .max(15)
      .pattern(new RegExp(/^(0[1-9][0-9]{8,9})$/))
      .message("Invalid Vietnamese phone number"),
    active: Joi.string().valid('0', '1')
  })

  return rule.validate(data)
}

module.exports = {
    userValidator
}
