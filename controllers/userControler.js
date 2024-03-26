const { SQUsers } = require("../models/sequelize")
const { Op } = require('sequelize');
const { userValidator } = require('../validations/userValidator')

const list = async (req, res) => {
  try {
    const options = {},
      { key, active } = req.query,
      attributes = ['id', 'name', 'phone', 'email', 'created_at', 'updated_at', 'active']

    Object.assign(options, { active: active ? active : '1' })
    if(key) Object.assign(options, {
      [Op.or]: [
        { name: { [Op.like]: `%${key}%` } },
        { email: { [Op.like]: `%${key}%` } }
      ]
    })
    const users = await SQUsers.findAll({
      attributes: attributes,
      where: { ...options }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const update = (req, res) => {
  try {
    const { error } = userValidator(req.body)
    if(error) return res.json(400).json({ message: error.details[0].message })
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  list,
  update
}
