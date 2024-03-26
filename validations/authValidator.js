const Joi = require('joi')

const registerValidator = (data) => {
  const rule = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,20}$/)).message('Password must contain both characters and numbers !').required(),
    phone: Joi.string().min(10).max(15).pattern(new RegExp(/^(0[1-9][0-9]{8,9})$/)).message('Invalid Vietnamese phone number').required()
  })
  return rule.validate(data)
}

const loginValidator = (data) => {
  const rule = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{6,20}$/)).required()
  })
  return rule.validate(data)
}

module.exports = {
  registerValidator,
  loginValidator
}
