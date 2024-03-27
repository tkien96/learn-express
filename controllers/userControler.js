const { SQUsers } = require("../models/sequelize")
const { Op } = require('sequelize');
const { userValidator } = require('../validations/userValidator')
const { currentDateTime } = require('../helpers/function')

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

const update = async (req, res) => {
  try {
    const data = req.body,
      { error } = userValidator(data),
      id = req.params.id
    if(!id) return res.status(400).json({ message: 'No data received !' })
    if(error) return res.status(400).json({ message: error.details[0].message })
    const checkUser = await SQUsers.findOne({ where: { id: id, active: "1" } })
    if(!checkUser) return res.status(400).json({ message: 'User not exists !' })
    await SQUsers.update({...data, ...{ updated_at: currentDateTime() }}, { where: { id: id }}).then((result) => {
      return res.status(200).json({ message: "User updated !", data: result })
    }).catch((err) => {
      return res.status(400).json({ message: err.message })
    }) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleted = async (req, res) => {
  try {
    const id = req.params.id
    if(!id) return res.status(400).json({ message: 'No data received !' })
    const checkUser = await SQUsers.findOne({ where: { id: id, active: "1" } })
    if(!checkUser) return res.status(400).json({ message: 'User not exists !' })
    await SQUsers.update({ active: '0' }, { where: { id: id }}).then((result) => {
      return res.status(200).json({ message: "User Deleted !", data: result })
    }).catch((err) => {
      return res.status(400).json({ message: err.message })
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  list,
  update,
  deleted
}
